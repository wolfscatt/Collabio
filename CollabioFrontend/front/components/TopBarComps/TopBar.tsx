"use client"
import React, { useEffect, useState } from "react";
import TopBarButton from "./TopBarButton";
import {
  FaChartBar,
  FaChartPie,
  FaFileAlt,
  FaList,
  FaPaperclip,
} from "react-icons/fa";
import { TiThLargeOutline } from "react-icons/ti";
import { AiFillSchedule } from "react-icons/ai";
import { FaCircleCheck } from "react-icons/fa6";
import LogoutButton from "./LogoutButton";
import { useSelectedProject } from "@/context/SelectedProjectContext";

const TopBar = () => {
  const { selectedProject } = useSelectedProject();
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        const user = JSON.parse(stored);
        if (user.username) {
          setUsername(user.username);
        }
      } catch {
        // parse hatası olursa yoksay
      }
    }
  }, []);
  return (
    <header>
      <div className="p-4 h-[10vh] bg-gradient-to-r from-[var(--color-dark)] to-[var(--color-light)] border-b-2 border-gray-300 flex justify-between border-l border-[var(--color-medium)] items-center box-border">
        <div className="flex rounded-md  text-gray-200 p-2 px-4 items-center gap-4">
          <h1 className="text-[3vh] font-semibold">{selectedProject?.name}</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-[2.5vh] font-medium text-gray-900 bg-[var(--color-medium)] rounded-full px-4 py-2">
            {username.toUpperCase() || "Misafir"}
          </div>
          <LogoutButton />
        </div>
      </div>

      <nav className="px-6 py-2 justify-between items-center bg-gradient-to-r from-[#8972e7] to-[#a18af7] shadow-md rounded-b-[16px] min-h-[56px] h-[56px] w-full relative z-10 box-border">
        <div className="nav-left flex flex-row ">
          <TopBarButton href="/summary" title="Özet" icon={FaChartPie} />
          <TopBarButton href="/pano" title="Pano" icon={TiThLargeOutline} />
          <TopBarButton href="/list" title="Liste" icon={FaList} />
          <TopBarButton href="/schedule" title="Takvim" icon={AiFillSchedule} />
          <TopBarButton href="/timeline" title="Zaman Çizelgesi" icon={FaChartBar} />
          <TopBarButton href="/confirmations" title="Onaylar" icon={FaCircleCheck} />
          <TopBarButton href="/files" title="Ekler" icon={FaPaperclip} />
        </div>
      </nav>
    </header>
  );
};

export default TopBar;
