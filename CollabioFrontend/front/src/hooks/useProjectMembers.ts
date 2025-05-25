"use client"
import { useEffect, useState } from "react";
import { useSelectedProject } from "@/context/SelectedProjectContext";
import api from "@/lib/api";

interface User {
  _id: string;
  username: string;
  email: string;
}

export const useProjectMembers = () => {
  const { selectedProject } = useSelectedProject();
  const [members, setMembers] = useState<User[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      if (!selectedProject?.members) return;

      try {
        const res = await api.post("/users/by-ids", {
          ids: selectedProject.members,
        });
        setMembers(res.data);
      } catch (err) {
        console.error("Kullanıcılar alınamadı:", err);
      }
    };

    fetchMembers();
  }, [selectedProject]);

  return members;
};
