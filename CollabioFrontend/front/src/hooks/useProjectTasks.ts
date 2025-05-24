import { useEffect, useState } from 'react';
import { useSelectedProject } from '@/context/SelectedProjectContext';
import api from '@/lib/api';
import { Task } from '@/types/task';

export const useProjectTasks = (reload = false) => {
  const { selectedProject } = useSelectedProject();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!selectedProject?._id) return;

      setLoading(true);
      try {
        const res = await api.get(`/tasks/${selectedProject._id}`);
        setTasks(res.data);
      } catch (err) {
        console.error("Görevler alınamadı:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [selectedProject, reload]); // 🔁 reload ekle

  return { tasks, loading };
};

