import { usePathname } from "next/navigation";
import React from "react";
import { IconType } from "react-icons";
import { motion } from "framer-motion";

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
    <motion.a
      href={href}
      whileHover={{ scale: 1.02, x: 4 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex items-center cursor-pointer gap-2 p-2 font-semibold text-[var(--color-light)] no-underline rounded text-[2vh] hover:bg-[var(--color-background)] hover:text-[var(--color-primary)] 
        ${isActive ? 'bg-[var(--color-background)] text-[var(--color-primary)]' : ''}`}
      onClick={onClick}
    >
      <motion.div
        animate={isActive ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        <Icon className="text-[1.8vh]" />
      </motion.div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {title}
      </motion.span>
    </motion.a>
  );
};

export default SidebarButton;
