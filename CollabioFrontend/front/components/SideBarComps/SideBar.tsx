"use client";
import SidebarButton from "./SidebarButton";
import {
  FaClock,
  FaStar,
  FaUser,
} from "react-icons/fa";
import { MdApps } from "react-icons/md";
import { LuListTodo } from "react-icons/lu";
import { FiPlus } from "react-icons/fi";
import { useEffect } from "react";
import { useState } from "react";
import api from "@/lib/api";
import { useSelectedProject } from "@/context/SelectedProjectContext";
import { Project } from "@/types/project";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const { selectedProject, setSelectedProject } = useSelectedProject();
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/projects", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects(res.data);
      } catch (err) {
        console.error("Projeler alınamadı:", err);
      }
    };

    fetchProjects();
  }, []);

  //selectedProject default olarak ilk projeyi seçer
  useEffect(() => {
    if (projects.length > 0 && !selectedProject) {
      setSelectedProject(projects[0]);
    }
  }, [projects, selectedProject, setSelectedProject]);

  return (
    <nav className="w-[8vw] min-w-[240px] bg-white h-screen p-4 border-[var(--color-medium)] flex flex-col overflow-y-auto">
      <div className="w-full h-[8vh] p-6 mb-2 border-b border-[var(--color-medium)] bg-white flex items-center justify-center overflow-hidden">
        <img
          src="images/collabio-logo.png"
          alt="Collabio Logo"
          className="w-[12vw] h-auto block mx-auto object-contain"
          width={100}
          height={100}
        />
      </div>

      <div className="flex flex-col gap-2 ">
        <SidebarButton href="" title="Sizin İçin" icon={FaUser} />
        <SidebarButton href="" title="En son" icon={FaClock} />
        <SidebarButton href="" title="Favori" icon={FaStar} />
        <SidebarButton href="" title="Uygulamalar" icon={MdApps} />
        <SidebarButton href="" title="Planlar" icon={LuListTodo} />
      </div>

      <div className="flex flex-col gap-2 ml-[1vh]">
        <div className="flex items-center justify-between">
          <span className="text-[2vh] font-semibold">Projeler</span>
          <button onClick={() => router.push("/createProject")} className="bg-none border-none text-[var(--color-light)] cursor-pointer rounded hover:bg-[var(--color-background)] hover:text-[var(--color-primary)]">
            <FiPlus />
          </button>
        </div>
        <ul className="flex flex-col gap-2 p-2">
          {projects.map((project: Project) => (
            <li
              key={project._id}
              onClick={() => setSelectedProject(project)}
              className={`flex items-center gap-2 text-sm rounded cursor-pointer px-3 py-2
          ${selectedProject?._id === project._id
                  ? "bg-purple-100 text-purple-800 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"}`}
            >

              {project.name}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
