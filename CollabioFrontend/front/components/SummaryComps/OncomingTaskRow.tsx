import React from "react";

interface OncomingTaskRowProps {
  mission: string;
  status: string;
  date: string;
  avatarUrl: string;
  name: string;
}

const OncomingTaskRow: React.FC<OncomingTaskRowProps> = ({
  mission,
  date,
  status,
  avatarUrl,
  name,
}) => {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-[#f0f0f0]">
      <div className="flex-1 flex flex-col gap-1">
        <span className="font-medium text-[var(--color-dark)]">{mission}</span>
        <span className="text-xs text-[var(--color-light)]">
          <i className="fas fa-calendar" /> {date}
        </span>
      </div>
      <div className="mr-3">
        <span className="inline-block px-4 py-1 rounded-full text-xs font-semibold bg-[#e3f2fd] text-[#1976d2] shadow-sm">
          {status}
        </span>
      </div>
      <div>
        <img
          src={avatarUrl}
          className="w-9 h-9 rounded-full border-2 border-white shadow"
          alt={name}
          title={name}
        />
      </div>
    </div>
  );
};

export default OncomingTaskRow;
