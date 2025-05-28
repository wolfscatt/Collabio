import React from "react";
import type { Task } from "@/types/task";
import { MdCancel } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

interface TaskCardProps {
  task: Task;
  onApprove?: (code: string) => void;
  onReject?: (code: string) => void;
}

const getPriorityColor = (priority: Task["priority"]) => {
  switch (priority) {
    case "high":
      return "red";
    case "medium":
      return "orange";
    case "low":
      return "green";
  }
};

export const TaskCard = ({ task, onApprove, onReject }: TaskCardProps) => {
  
  const priorityColor = getPriorityColor(task.priority);
  const assigneeInitials = task.assignee?.username
    .split(" ")
    .map((word) => word[0]?.toUpperCase())
    .join("");

  const isPending = task.approvalStatus === "pending";
  const isApproved = task.approvalStatus === "approved";
  const isRejected = task.approvalStatus === "reject";

  return (
    <div className="w-full border rounded-xl shadow-sm overflow-hidden bg-white my-3">
      <div className="flex border-l-4" style={{ borderColor: priorityColor }}>
        <div className="p-4 flex flex-col gap-3 w-full relative">

          {/* Code + Priority */}
          <div className="flex justify-between items-center">

            <span
              className={`text-xs font-semibold px-2 py-1 rounded ${isPending
                ? "border"
                : "text-white"
                }`}
              style={
                isPending
                  ? {
                    backgroundColor: `${priorityColor}22`,
                    color: priorityColor,
                    borderColor: priorityColor,
                    borderStyle: "solid",
                    borderWidth: 1,
                  }
                  : {
                    backgroundColor: priorityColor,
                  }
              }
            >
              {task.priority}
            </span>
          </div>

          {/* Status Badge */}
          {isPending && (
            <div className="bg-orange-500 text-white text-xs font-semibold text-center px-6 py-1 rounded-md w-full max-w-[300px] mx-auto">
              Beklemede
            </div>
          )}
          {isApproved && (
            <div className="bg-green-500 text-white text-xs font-semibold text-center px-6 py-1 rounded-md w-full max-w-[300px] mx-auto">
              Onaylandı
            </div>
          )}
          {isRejected && (
            <div className="bg-red-500 text-white text-xs font-semibold text-center px-6 py-1 rounded-md w-full max-w-[300px] mx-auto flex items-center justify-center gap-1">
              <MdCancel />
              <span>Reddedildi</span>
            </div>
          )}

          {/* Title & Description */}
          <div>
            <div className="flex justify-between items-start mt-2">
              <h3 className="text-base font-bold text-gray-800">{task.title}</h3>
            </div>
            <p className="text-sm text-gray-600">{task.description}</p>
          </div>

          {/* Assignee and Date */}
          <div className="flex justify-start items-center mt-4">
            {/* Profil Kutusu */}
            <div
              className="w-8 h-8 rounded-full text-white flex items-center justify-center text-xs font-semibold shadow"
              style={{ backgroundColor: "var(--color-primary)" }}
              title={task.assignee?.username || ""}
            >
              {assigneeInitials}
            </div>
            <span className="text-[2vh] ml-[2vh] flex-1 text-black">{task.assignee?.username.toUpperCase()}</span>

            {/* Tarih */}
            <span className="text-xs text-gray-400">
              {task.updatedAt ? new Date(task.updatedAt).toLocaleString("tr-TR") : "Tarih yok"}
            </span>
          </div>

          {/* Action Buttons */}
          {isPending && (
            <div className="flex gap-2 mt-4">
              <button
                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded bg-green-500 text-white hover:bg-green-600 font-semibold text-sm"
                onClick={() => onApprove?.(task._id)}
              >
                <FaCheck size={16} /> Onayla
              </button>
              <button
                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded bg-red-500 text-white hover:bg-red-600 font-semibold text-sm"
                onClick={() => onReject?.(task._id)}
              >
                <MdCancel /> Reddet
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
