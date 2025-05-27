"use client";

import React, { useState, useEffect } from "react";
import { TaskList } from "../../../../components/TaskComps/TaskList";
import type { Task } from "@/types/task";
import api from "@/lib/api";
import { useProjectTasks } from "@/hooks/useProjectTasks";
import { useSelectedProject } from "@/context/SelectedProjectContext";
import { useRouter } from "next/navigation";

export default function TasksPage() {
  const { selectedProject } = useSelectedProject();
  const { tasks } = useProjectTasks(!!selectedProject?._id);
  const router = useRouter();
  // 2) Filtreler
  const pendingTasks = tasks.filter((t) => !t.isApproved);
  const approvedTasks = tasks.filter((t) => t.isApproved);

  const handleApprove = async (taskId: string) => {
    if (!selectedProject?._id) return;

    try {
      // Düzgün rota burası:
      await api.patch("/tasks", {
        projectId: selectedProject._id,
        taskId,
        isApproved: true,
      });

      // verileri yeniden çek
      router.refresh();
    } catch (err) {
      console.error("Onaylama sırasında hata oluştu:", err);
    }
  };

  return (
    <div className="p-6 space-y-8">
      {/* Bekleyen Görevler */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-2 relative pb-2">
          Bekleyen Görevler
          <hr className="border-t border-gray-300 mt-2" />
        </h2>
        <TaskList tasks={pendingTasks} onApprove={handleApprove} />
      </div>

      {/* Onaylanan Görevler */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-2 relative pb-2">
          Onaylanan Görevler
          <hr className="border-t border-gray-300 mt-2" />
        </h2>
        <TaskList tasks={approvedTasks} />
      </div>
      {/* Reddedilen Görevler */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-2 relative pb-2">
          Reddedilen Görevler
          <hr className="border-t border-gray-300 mt-2" />
        </h2>
        <TaskList tasks={pendingTasks} />
      </div>
    </div>
  );
}
