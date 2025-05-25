"use client";

import { useEffect, useState } from "react";
import api from "../../lib/api";
import ProtectedRoute from "../../../components/ProtectedRoute";

interface Project {
  _id: string;
  name: string;
  description: string;
  status: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/projects", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProjects(res.data);
      } catch (err) {
        console.error("Projeler alınamadı:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <ProtectedRoute>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-black mb-4">Projeler</h1>
        {loading ? (
          <p className="text-gray-500">Yükleniyor...</p>
        ) : (
          <ul className="space-y-4">
            {projects.map((project) => (
              <li key={project._id} className="bg-white shadow p-4 rounded">
                <h2 className="text-lg font-semibold text-purple-800">{project.name}</h2>
                <p className="text-sm text-gray-700">{project.description}</p>
                <p className="text-xs text-gray-500 italic">Durum: {project.status}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </ProtectedRoute>
  );
}
