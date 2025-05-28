"use client";
import React, { useState, useEffect } from "react";
import { TaskList } from "../../../../components/TaskComps/TaskList";
import { useProjectTasks } from "@/hooks/useProjectTasks";
import { useSelectedProject } from "@/context/SelectedProjectContext";
import api from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";

export default function TasksPage() {
  const { selectedProject } = useSelectedProject();
  const { tasks: fetchedTasks } = useProjectTasks(!!selectedProject?._id);

  // 1) useProjectTasks'den gelen görevleri yerel state olarak tut
  const [tasks, setTasks] = useState(fetchedTasks);

  // Fetched değiştikçe güncelle
  useEffect(() => {
    setTasks(fetchedTasks);
  }, [fetchedTasks]);

  // Sadece kendi görevlerim
  const [myId, setMyId] = useState("");
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const u = JSON.parse(stored);
      setMyId(u.id);
    }
  }, []);

  const myTasks = tasks.filter((t) => t.assignee?._id === myId);
  const pendingTasks = myTasks.filter((t) => t.approvalStatus === "pending");
  const approvedTasks = myTasks.filter((t) => t.approvalStatus === "approved");
  const rejectedTasks = myTasks.filter((t) => t.approvalStatus === "reject");

  const handleApprove = async (taskId: string) => {
    try {
      const token = localStorage.getItem("token");
      await api.put(
        `/tasks/${taskId}/approve`,
        { status: "approved" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTasks((prev) =>
        prev.map((t) =>
          t._id === taskId ? { ...t, approvalStatus: "approved" } : t
        )
      );
    } catch (err) {
      console.error(err);
    }
  };
  const handleReject = async (taskId: string) => {
    try {
      const token = localStorage.getItem("token");
      await api.put(
        `/tasks/${taskId}/approve`,
        { status: "reject" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTasks((prev) =>
        prev.map((t) =>
          t._id === taskId ? { ...t, approvalStatus: "reject" } : t
        )
      );
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 space-y-8"
    >
      {/* Bekleyen */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg shadow p-6"
      >
        <motion.h2 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl font-bold mb-2"
        >
          Bekleyen Görevler
        </motion.h2>
        <AnimatePresence>
          <TaskList tasks={pendingTasks} onApprove={handleApprove} onReject={handleReject} />
        </AnimatePresence>
      </motion.div>

      {/* Onaylanan */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-lg shadow p-6"
      >
        <motion.h2 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl font-bold mb-2"
        >
          Onaylanan Görevler
        </motion.h2>
        <AnimatePresence>
          <TaskList tasks={approvedTasks} />
        </AnimatePresence>
      </motion.div>

      {/* Reddedilen */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-lg shadow p-6"
      >
        <motion.h2 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl font-bold mb-2"
        >
          Reddedilen Görevler
        </motion.h2>
        <AnimatePresence>
          <TaskList tasks={rejectedTasks} />
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
