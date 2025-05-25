import React from "react";

interface TaskStatusRowProps {
  name: string;
  avatarUrl: string;
}

const TaskStatusRow: React.FC<TaskStatusRowProps> = ({ name, avatarUrl }) => {
  return (
    <div className="flex items-center gap-4 border-b border-[#f0f0f0] pb-4">
      <div className="flex items-center gap-2 w-32">
        <img
          src={avatarUrl}
          className="w-10 h-10 rounded-full border-2 border-white shadow"
          alt={avatarUrl}
        />
        <span className="text-sm text-[var(--color-dark)]">Ö{name}</span>
      </div>
      <div className="flex-1">
        <div className="h-2 bg-gray-100 rounded flex overflow-hidden mb-1">
          <div
            className="h-full"
            style={{ width: "30%", backgroundColor: "#f4a261" }}
          ></div>
          <div
            className="h-full"
            style={{ width: "70%", backgroundColor: "#e76f51" }}
          ></div>
        </div>
        <div className="text-xs text-[var(--color-light)] flex gap-3">
          <span>1 Yapılacak</span>
          <span>1 Devam Ediyor</span>
        </div>
      </div>
    </div>
  );
};

export default TaskStatusRow;
