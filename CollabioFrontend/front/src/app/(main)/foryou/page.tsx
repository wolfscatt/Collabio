"use client";
import React, { useEffect, useState } from 'react';
import { Briefcase, Clock } from 'lucide-react';
import ProjectCart from '../../../../components/ForYouComps/ProjectCart';
import api from '@/lib/api';
import { Project } from '@/types/project';
import TaskCart from '../../../../components/ForYouComps/TaskCart';
import { Task } from '@/types/task';
import Loading from '../../../../components/Loading';
import { motion, AnimatePresence } from 'framer-motion';


const ForYou: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [active, setActive] = useState<"working" | "assigned">("working");
  const [myId, setMyId] = useState<string>("");
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        const u = JSON.parse(stored);
        if (u.id) setMyId(u.id);
      } catch {
        //
      }
    }
  }, []);
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

  useEffect(() => {
    if (projects.length === 0) {
      setAllTasks([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    Promise.all(
      projects.map((p) =>
        api
          .get<Task[]>(`/tasks/${p._id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          })
          .then((res) => res.data)
      )
    )
      .then((arrays) => {
        setAllTasks(arrays.flat());
      })
      .catch((err) => {
        console.error("Görevler alınamadı:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [projects]);

  const myTasks = allTasks.filter((t) => t.assignee?._id === myId);
  const myWorkingTasks = allTasks.filter((t) => t.status === "in-progress");
  if (loading) {
    return <Loading />;
  }
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex-1 flex flex-col bg-gradient-to-br from-purple-50 to-white"
    >
      <div className="flex-1 p-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-7xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-8">
            <Briefcase className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-800">Sizin için</h1>
          </div>

          {/* Recent Projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12 bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-600" />
                <h2 className="text-xl font-semibold text-gray-800">En son projeler</h2>
              </div>
            </div>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {projects.map((project, index) => (
                <motion.div
                  key={project._id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProjectCart
                    name={project.name}
                    description={project.description}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Tasks Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            {/* Tab headers */}
            <div className="flex space-x-6 mb-6 border-b border-gray-200">
              <motion.button
                onClick={() => setActive("working")}
                className={`relative pb-4 font-medium text-lg transition-colors duration-200 ${active === "working" ? "text-purple-600" : "text-gray-600 hover:text-purple-500"
                  }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Üzerinde çalışılanlar
                {active === "working" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="ml-2 bg-purple-100 text-purple-600 rounded-full px-2.5 py-0.5 text-sm">
                  {myWorkingTasks.length}
                </span>
              </motion.button>

              <motion.button
                onClick={() => setActive("assigned")}
                className={`relative pb-4 font-medium text-lg transition-colors duration-200 ${active === "assigned" ? "text-purple-600" : "text-gray-600 hover:text-purple-500"
                  }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Bana atananlar
                {active === "assigned" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="ml-2 bg-purple-100 text-purple-600 rounded-full px-2.5 py-0.5 text-sm">
                  {myTasks.length}
                </span>
              </motion.button>
            </div>

            {/* Tab panels */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="mt-6"
              >
                <motion.div
                  className="flex flex-col gap-4"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.1
                      }
                    }
                  }}
                >
                  {(active === "working" ? myWorkingTasks : myTasks).map((task, index) => (
                    <motion.div
                      key={task._id}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 }
                      }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <TaskCart task={task} />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </motion.main>
  );
};

export default ForYou;