import React from "react";

interface FilterBarTextProps {
  text: string;
}

const FilterBarText: React.FC<FilterBarTextProps> = ({ text }) => {
  return (
    <div>
      <div className="flex flex-col gap-1">
        <span className="text-sm text-[var(--color-light)]">Son 7 günde</span>
        <span className="font-medium text-[var(--color-dark)]">{text}</span>
      </div>
    </div>
  );
};

export default FilterBarText;
