"use client";
import { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import TaskColumn from "./TaskColumn";
import { useProjectTasks } from "@/hooks/useProjectTasks";

interface TaskCardData {
  id: string;
  title: string;
  author: string;
  date: string;
}

type ColumnsType = {
  yapılacaklar: TaskCardData[];
  devam: TaskCardData[];
  beklemede: TaskCardData[];
  tamam: TaskCardData[];
};

const TaskBoard: React.FC<{ reload: boolean }> = ({ reload }) => {
  const { tasks, loading } = useProjectTasks(reload);

  const [columns, setColumns] = useState<ColumnsType>({
    yapılacaklar: [],
    devam: [],
    beklemede: [],
    tamam: [],
  });

  useEffect(() => {
    if (loading) return;

    const grouped: ColumnsType = {
      yapılacaklar: [],
      devam: [],
      beklemede: [],
      tamam: [],
    };

    for (const task of tasks) {
      const mapped: TaskCardData = {
        id: task._id,
        title: task.title,
        author: task.assignee?.username || "Atanmamış",
        date: new Date(task.startDate || task.createdAt).toLocaleDateString(
          "tr-TR"
        ),
      };

      switch (task.status) {
        case "to-do":
          grouped.yapılacaklar.push(mapped);
          break;
        case "in-progress":
          grouped.devam.push(mapped);
          break;
        case "pending":
          grouped.beklemede.push(mapped);
          break;
        case "done":
          grouped.tamam.push(mapped);
          break;
        default:
          grouped.yapılacaklar.push(mapped);
      }
    }

    setColumns(grouped);
  }, [tasks, loading, reload]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    // Avoid mutating state directly
    const srcId = source.droppableId as keyof ColumnsType;
    const dstId = destination.droppableId as keyof ColumnsType;
    const sourceCol = Array.from(columns[srcId]);
    const destCol = Array.from(columns[dstId]);
    const [moved] = sourceCol.splice(source.index, 1);
    destCol.splice(destination.index, 0, moved);

    setColumns({
      ...columns,
      [srcId]: sourceCol,
      [dstId]: destCol,
    });

    // TODO: send status update to backend here
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex h-screen w-full pt-[1.5vh] gap-4">
        <TaskColumn
          columnId="yapılacaklar"
          title="YAPILACAKLAR"
          tasks={columns.yapılacaklar}
        />
        <TaskColumn
          columnId="devam"
          title="DEVAM EDİYOR"
          tasks={columns.devam}
        />
        <TaskColumn
          columnId="beklemede"
          title="BEKLEMEDE"
          tasks={columns.beklemede}
        />
        <TaskColumn columnId="tamam" title="TAMAM" tasks={columns.tamam} />
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;
