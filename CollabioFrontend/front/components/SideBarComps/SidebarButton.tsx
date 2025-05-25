import React from "react";
import { IconType } from "react-icons";

interface SidebarButtonProps {
  title: string;
  href: string;
  icon: IconType;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({
  title,
  href,
  icon: Icon,
}) => {
  return (
    <a
      href={href}
      className="flex items-center gap-2 p-2 font-semibold text-[var(--color-light)] no-underline rounded text-[2vh] hover:bg-[var(--color-background)] hover:text-[var(--color-primary)]"
    >
      <Icon className="text-[1.8vh]" />
      {title}
    </a>
  );
};

export default SidebarButton;
