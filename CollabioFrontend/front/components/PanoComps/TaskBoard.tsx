"use client";
import { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import TaskColumn from "./TaskColumn";
import { useProjectTasks } from "@/hooks/useProjectTasks";
import { useSelectedProject } from "@/context/SelectedProjectContext";
import api from "@/lib/api";
import { toast } from "react-toastify";

interface TaskCardData {
  id: string;
  title: string;
  author: string;
  date: string;
}

interface ProjectOwner {
  _id: string;
  username?: string;
  email?: string;
  role?: string;
}

type ColumnsType = {
  yapılacaklar: TaskCardData[];
  devam: TaskCardData[];
  beklemede: TaskCardData[];
  tamam: TaskCardData[];
};

// droppableId → API'de beklenen status değeri
const statusMap: Record<keyof ColumnsType, string> = {
  "yapılacaklar": "to-do",
  "devam": "in-progress",
  "beklemede": "review",
  "tamam": "done",
};

export default function TaskBoard({ reload }: { reload: boolean }) {
  const { selectedProject } = useSelectedProject();
  const { tasks, loading } = useProjectTasks(!!selectedProject?._id);
  const [columns, setColumns] = useState<ColumnsType>({
    yapılacaklar: [],
    devam: [],
    beklemede: [],
    tamam: [],
  });

  // Kullanıcının kendi ID'si:
  const [myId, setMyId] = useState<string>("");
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const u = JSON.parse(stored);
      setMyId(u.id);
    }
  }, []);

  useEffect(() => {
    if (loading) return;

    const grouped: ColumnsType = {
      yapılacaklar: [],
      devam: [],
      beklemede: [],
      tamam: [],
    };

    for (const t of tasks) {
      const card: TaskCardData = {
        id: t._id,
        title: t.title,
        author: t.assignee?.username || "Atanmamış",
        date: new Date(t.startDate || t.createdAt).toLocaleDateString("tr-TR"),
      };
      switch (t.status) {
        case "to-do": grouped.yapılacaklar.push(card); break;
        case "in-progress": grouped.devam.push(card); break;
        case "review": grouped.beklemede.push(card); break;
        case "done": grouped.tamam.push(card); break;
        default: grouped.yapılacaklar.push(card);
      }
    }
    setColumns(grouped);
  }, [tasks, loading, reload]);

  const onDragEnd = async (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const src = source.droppableId as keyof ColumnsType;
    const dst = destination.droppableId as keyof ColumnsType;
    if (src === dst && source.index === destination.index) return;

    // Taşınan kart
    const sourceList = Array.from(columns[src]);
    const [moved] = sourceList.splice(source.index, 1);

    // Orijinal task kaydını bul
    const original = tasks.find((t) => t._id === moved.id);
    if (!original) return;

    // 1) Owner ID normalize
    let projectOwnerId = "";
    if (typeof selectedProject?.owner === "string") {
      projectOwnerId = selectedProject.owner;
    } else if (selectedProject?.owner && typeof selectedProject.owner === "object") {
      // eğer populate edilmiş obje geldiyse
      projectOwnerId = (selectedProject.owner as ProjectOwner)._id;
    }
    // Kullanıcı ID'si elimizdeki myId
    console.log("Project owner ID:", projectOwnerId);
    console.log("My ID:", myId);

    // Yetki kontrolü
    const isOwner = projectOwnerId === myId;
    const isAssignee = original.assignee?._id === myId;
    if (!isOwner && !isAssignee) {
      toast.error("Bu görevi güncelleme yetkiniz yok!");
      return;
    }

    // 2) UI güncelle
    const destList = Array.from(columns[dst]);
    destList.splice(destination.index, 0, moved);
    setColumns({
      ...columns,
      [src]: sourceList,
      [dst]: destList,
    });

    // 3) Backend güncelle
    const newStatus = statusMap[dst];
    try {
      await api.put(
        `/tasks/${moved.id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      toast.success(`Statü "${original.status}" → "${newStatus}" olarak güncellendi`);
    } catch (err) {
      console.error("Statü güncellenirken hata:", err);
      toast.error("Statü güncellenirken bir hata oluştu.");
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex h-full min-h-[72vh] w-full pt-[1.5vh] gap-4">
        <TaskColumn columnId="yapılacaklar" title="YAPILACAKLAR" tasks={columns.yapılacaklar} />
        <TaskColumn columnId="devam" title="DEVAM EDİYOR" tasks={columns.devam} />
        <TaskColumn columnId="beklemede" title="BEKLEMEDE" tasks={columns.beklemede} />
        <TaskColumn columnId="tamam" title="TAMAM" tasks={columns.tamam} />
      </div>
    </DragDropContext>
  );
}
