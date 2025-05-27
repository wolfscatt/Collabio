"use client";
import React, { useEffect, useState } from 'react';
import { Filter, X, Star } from 'lucide-react';
import ProjectCart from '../../../../components/ForYouComps/ProjectCart';
import api from '@/lib/api';
import { Project } from '@/types/project';
import TaskCart from '../../../../components/ForYouComps/TaskCart';
import { useProjectTasks } from '@/hooks/useProjectTasks';
import { Task } from '@/types/task';

interface TaskItem {
  id: string;
  code: string;
  title: string;
  date: string;
  assignee: {
    name: string;
    initials: string;
    color: string;
  };
  completed?: boolean;
}

interface TabData {
  id: string;
  label: string;
  count: number;
  tasks: TaskItem[];
}

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
    return <div className="flex-1 mt-[20vh] flex items-center justify-center">
      <div className="w-[10vw] h-[10vw] rounded-full animate-spin">
        <img src="/favicon.ico" alt="loading" className="w-full h-full" />
      </div>
    </div>;
  }
  return (
    <main className="flex-1 flex flex-col">

      {/* Content */}
      <div className="flex-1 p-6 bg-gray-50">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Sizin için</h1>
        {/* Recent Projects */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-medium text-gray-800">En son projeler</h2>
            <text className="text-sm font-medium  transition-colors" style={{ color: '#8972e7' }}>
              Tüm projeleri görüntüleyin
            </text>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            {projects.map((project) => (
              <ProjectCart key={project._id} name={project.name} description={project.description} />
            ))}
          </div>
        </div>
        <div className="w-full border-b border-gray-300 bg-white p-4 rounded-lg">
          {/* Tab headers */}
          <div className="flex space-x-4">
            <button
              onClick={() => setActive("working")}
              className={`pb-2 font-medium ${active === "working"
                ? "border-b-2 border-purple-600 text-purple-600"
                : "text-gray-600"
                }`}
            >
              Üzerinde çalışılanlar{" "}
              <span className="ml-1 bg-gray-200 text-gray-800 rounded-full px-2 text-xs">
                {myWorkingTasks.length}
              </span>
            </button>
            <button
              onClick={() => setActive("assigned")}
              className={`pb-2 font-medium ${active === "assigned"
                ? "border-b-2 border-purple-600 text-purple-600"
                : "text-gray-600"
                }`}
            >
              Bana atananlar{" "}
              <span className="ml-1 bg-gray-200 text-gray-800 rounded-full px-2 text-xs">
                {myTasks.length}
              </span>
            </button>
          </div>

          {/* Tab panels */}
          <div className="mt-4">
            {active === "working" ? (
              <div className="flex flex-col gap-4">
                {myWorkingTasks.map((task) => (
                  <TaskCart key={task._id} task={task} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {myTasks.map((task) => (
                  <TaskCart key={task._id} task={task} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>


    </main>
  );
};

export default ForYou;