"use client";

import { useRouter } from "next/navigation";
import { TbLogout2 } from "react-icons/tb";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("");
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
    >
      <TbLogout2 className="text-[4vh] cursor-pointer hover:text-[var(--color-primary)] text-[var(--color-medium)] transition-colors" />
    </button>
  );
}
