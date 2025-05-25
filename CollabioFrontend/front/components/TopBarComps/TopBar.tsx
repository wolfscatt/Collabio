"use client"
import React from "react";
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
  return (
    <header>
      <div className="p-4 h-[10vh] flex justify-between border-l border-[var(--color-medium)] items-center box-border">
        <h1 className="text-[4vh] font-semibold">{selectedProject?.name}</h1>
        <div className="flex items-center gap-4">
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
          <TopBarButton href="/forms" title="Formlar" icon={FaFileAlt} />
          <TopBarButton href="/files" title="Ekler" icon={FaPaperclip} />
        </div>
      </nav>
    </header>
  );
};

export default TopBar;
