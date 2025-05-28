"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IconType } from "react-icons";

interface TopBarButtonProps {
  title: string;
  href: string;
  icon: IconType;
}

const TopBarButton: React.FC<TopBarButtonProps> = ({
  title,
  href,
  icon: IconType,
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`text-white mr-[1vh] px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap flex items-center gap-[6px] h-[36px] transition-colors duration-200
        hover:text-[var(--color-dark)] hover:bg-[var(--color-light)]
        ${isActive ? 'bg-white/20 text-white' : ''}`}
    >
      <IconType />
      {title}
    </Link>
  );
};

export default TopBarButton;
