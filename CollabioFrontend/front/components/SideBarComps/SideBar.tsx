"use client";
import SidebarButton from "./SidebarButton";
import {
  FaClock,
  FaStar,
  FaUser,
} from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { useEffect } from "react";
import { useState } from "react";
import api from "@/lib/api";
import { useSelectedProject } from "@/context/SelectedProjectContext";
import { Project } from "@/types/project";
import { useRouter } from "next/navigation";
import ModalFavorites from "../Modals/Favorites";
import ModalLatest from "../Modals/Latest";
import EditProject from "../Modals/EditProject";
import { motion, AnimatePresence } from "framer-motion";
import { useProjects } from "@/context/ProjectsContext";
import { MdEdit } from "react-icons/md";


export default function Sidebar() {
  const router = useRouter();
  const { selectedProject, setSelectedProject } = useSelectedProject();
  const { setRefreshProjects } = useProjects();
  const [isFavoriOpen, setIsFavoriOpen] = useState(false);
  const [isLatestOpen, setIsLatestOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState([]);

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

  useEffect(() => {
    fetchProjects();
    setRefreshProjects(() => fetchProjects);
  }, [setRefreshProjects]);

  //selectedProject default olarak ilk projeyi seçer
  useEffect(() => {
    if (projects.length > 0 && !selectedProject) {
      setSelectedProject(projects[0]);
    }
  }, [projects, selectedProject, setSelectedProject]);

  const handleEditClick = (e: React.MouseEvent, project: Project) => {
    e.stopPropagation();
    setEditingProject(project);
    setIsEditOpen(true);
  };

  return (
    <>
      <motion.nav
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="w-[15vw] h-screen p-4 border-[var(--color-medium)] rounded-r-[16px] flex flex-col overflow-y-auto"
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full h-[8vh] p-6 mb-2 border-b border-[var(--color-medium)] bg-white flex items-center justify-center overflow-hidden"
        >
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            src="images/collabio-logo.png"
            alt="Collabio Logo"
            className="w-[12vw] h-auto block mx-auto object-contain"
            width={100}
            height={100}
          />
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="flex flex-col gap-2"
        >
          <SidebarButton href="/foryou" title="Sizin İçin" icon={FaUser} />
          <SidebarButton title="En son" icon={FaClock} onClick={() => setIsLatestOpen(true)} />
          <SidebarButton title="Favori" icon={FaStar} onClick={() => setIsFavoriOpen(true)} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col gap-2 ml-[1vh] mt-[2vh]"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-between"
          >
            <span className="text-[2vh] font-semibold">Projeler</span>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => router.push("/createProject")}
              className="bg-none border-none text-[var(--color-light)] cursor-pointer rounded hover:bg-[var(--color-background)] hover:text-[var(--color-primary)]"
            >
              <FiPlus />
            </motion.button>
          </motion.div>
          <motion.ul
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.05
                }
              }
            }}
            className="flex flex-col gap-2 p-2"
          >
            <AnimatePresence>
              {projects.map((project: Project, index: number) => (
                <motion.li
                  key={project._id}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedProject(project)}
                  className={`group flex items-center justify-between gap-2 text-sm rounded cursor-pointer px-3 py-2
                    ${selectedProject?._id === project._id
                      ? "bg-purple-100 text-purple-800 font-semibold"
                      : "text-gray-700 hover:bg-gray-100"}`}
                >
                  <span className="flex-1 truncate">{project.name}</span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => handleEditClick(e, project)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-500 hover:text-purple-600 p-1 rounded-full hover:bg-purple-50"
                    title="Projeyi Düzenle"
                  >
                    <MdEdit className="w-4 h-4" />
                  </motion.button>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </motion.div>
      </motion.nav>

      <AnimatePresence>
        {isFavoriOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <ModalFavorites onClose={() => setIsFavoriOpen(false)} />
          </motion.div>
        )}
        {isLatestOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <ModalLatest onClose={() => setIsLatestOpen(false)} />
          </motion.div>
        )}
        {isEditOpen && editingProject && (
          <EditProject
            isOpen={isEditOpen}
            onClose={() => {
              setIsEditOpen(false);
              setEditingProject(null);
            }}
            project={editingProject}
            onProjectUpdate={fetchProjects}
          />
        )}
      </AnimatePresence>
    </>
  );
}
