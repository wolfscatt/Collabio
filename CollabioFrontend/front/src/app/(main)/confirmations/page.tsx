"use client";
import { useState } from "react";
import { TaskList } from "../../../../components/TaskComps/TaskList";
import type { Task } from "@/types/task";

const initialTasks: Task[] = [
  {
    _id: "COL-12",
    title: "İş Akışları",
    description: "Akış sisteminin tasarımı yapılacak.",
    priority: "high",
    assignee: {
      _id: "123",
      username: "Ceren Yolur",
      email: "ceren@example.com",
    },
    status: "pending",
    updatedAt: "2025-03-20",
    isApproved: false,
    projectId: {
      _id: "123",
      name: "Proje 1",
      description: "Proje 1 hakkında",
      owner: "123",
      members: ["123", "456"],
      status: "active",
      createdAt: "2025-03-20",
      updatedAt: "2025-03-20",
      __v: 0,
    },
    tags: ["tag1", "tag2"],
    comments: [],
    createdAt: "2025-03-20",
    __v: 0,
  },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const handleApprove = (code: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t._id === code ? { ...t, status: "approved", updatedAt: new Date().toISOString() } : t
      )
    );
  };
  const handleReject = (task: Task) => {
    setTasks((prev) =>
      prev.map((t) =>
        t._id === task._id
          ? {
            ...t,
            status: "rejected",
            updatedAt: new Date().toISOString(),
          }
          : t
      )
    );
  }
  return (
    <div className="p-6 space-y-8">
      {/* Onay Bekleyen */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-2 relative pb-2">
          Bekleyen Görevler
          <hr className="border-t border-gray-300 mt-2" />
        </h2>
        <TaskList tasks={tasks.filter((t) => t.status === "pending")} onApprove={handleApprove} onReject={handleReject} />
      </div>

      {/* Onaylanan */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-2 relative pb-2">
          Onaylanan Görevler
          <hr className="border-t border-gray-300 mt-2" />
        </h2>
        <TaskList tasks={tasks.filter((t) => t.status === "approved")} />
      </div>

      {/* Reddedilen */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-2 relative pb-2">
          Reddedilen Görevler
          <hr className="border-t border-gray-300 mt-2" />
        </h2>
        <TaskList tasks={tasks.filter((t) => t.status === "rejected")} />
      </div>
    </div>
  );
};



