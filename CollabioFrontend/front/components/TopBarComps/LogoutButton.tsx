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
      data-testid="logout-button"
      id="logout-button"
      onClick={handleLogout}
      className="cursor-pointer hover:text-gray-900 text-white transition-colors"
    >
      <TbLogout2 className="text-[4vh] " />
    </button>
  );
}
