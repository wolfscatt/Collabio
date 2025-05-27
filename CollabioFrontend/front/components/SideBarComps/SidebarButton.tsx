import { usePathname } from "next/navigation";
import React from "react";
import { IconType } from "react-icons";

interface SidebarButtonProps {
  title: string;
  href?: string;
  icon: IconType;
  onClick?: () => void;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({
  title,
  href,
  icon: Icon,
  onClick,
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <a
      href={href}
      className={`flex items-center cursor-pointer gap-2 p-2 font-semibold text-[var(--color-light)] no-underline rounded text-[2vh] hover:bg-[var(--color-background)] hover:text-[var(--color-primary)] 
        ${isActive ? 'bg-[var(--color-background)] text-[var(--color-primary)]' : ''}`}
      onClick={onClick}
    >
      <Icon className="text-[1.8vh]" />
      {title}
    </a>
  );
};

export default SidebarButton;
