"use client";

import React from "react";
import {
  FaCode,
  FaCog,
  FaDatabase,
  FaLaptop,
  FaPaintBrush,
  FaStream,
} from "react-icons/fa";
import ListRow from "../../../../components/ListComps/ListRow";
import ProtectedRoute from "../../../../components/ProtectedRoute";
import { useProjectTasks } from "@/hooks/useProjectTasks";

const Page = () => {
  const { tasks } = useProjectTasks();
  const iconFromCategory = (category: string) => {
    switch (category?.toLowerCase()) {
      case "backend":
        return <FaCode />;
      case "frontend":
        return <FaLaptop />;
      case "database":
        return <FaDatabase />;
      case "ux/ui":
        return <FaPaintBrush />;
      case "iş analizi":
        return <FaStream />;
      case "test":
        return <FaCog />;
      default:
        return <FaStream />;
    }
  };
  const formattedTasks = tasks.map((task) => ({
    taskId: task._id,
    icon: iconFromCategory(task.tags[0] || ''),
    title: task.title,
    summary: task.description || 'Açıklama girilmemiş.',
    status: task.status,
    commentLength: task.comments.length ?? 0,
    category: task.tags[0] || 'Genel',
    categoryColor: task.tags || '#8b5cf6',
    assignee: task.assignee?.username || '??',
  }));



  return (
    <ProtectedRoute>
      <div className="w-[83vw] ml-[1vh] mt-[1vh] rounded-xl overflow-hidden shadow-md bg-white">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="bg-purple-100 h-[7vh] text-[1vw] text-purple-900">
              <th className="px-[2vh] py-[0.5vh]">Tür</th>
              <th className="px-[1vh] py-[0.5vh]">Başlık</th>
              <th className="px-[1vh] py-[0.5vh]">Özet</th>
              <th className="px-[1vh] py-[0.5vh]">Durum</th>
              <th className="px-[1vh] py-[0.5vh]">Yorumlar</th>
              <th className="px-[1vh] py-[0.5vh]">Kategori</th>
              <th className="px-[1vh] py-[0.5vh]">Atanan</th>
            </tr>
          </thead>
          <tbody>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any   */}
            {formattedTasks.map((task: any, index: number) => (
              <ListRow key={index} {...task} />
            ))}
          </tbody>
        </table>
      </div>
    </ProtectedRoute>
  );
};

export default Page;
