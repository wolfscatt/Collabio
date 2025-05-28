"use client";
import React, { useState, useEffect } from "react";
import ActivityItem from "../../../../components/TimelineComps/ActivityItem";
import api from "@/lib/api";
import { useProjectTasks } from "@/hooks/useProjectTasks";
import { useSelectedProject } from "@/context/SelectedProjectContext";
import {
  parseISO,
  isToday,
  isWithinInterval,
  subDays,
  isThisMonth,
  endOfMonth,
  isAfter,
} from "date-fns";
import { ActionType } from "@/types/log";
import Loading from "../../../../components/Loading";
import { LogEntry } from "@/hooks/useProjectActivity";
import { motion, AnimatePresence } from "framer-motion";


interface EnrichedLog extends LogEntry {
  taskTitle: string;
  taskDescription: string;
  taskPriority: string;
  logUpdatedAt: string;
}
const Page: React.FC = () => {
  const { selectedProject } = useSelectedProject();
  const { tasks, loading: tasksLoading } = useProjectTasks(
    !!selectedProject?._id
  );

  const [logs, setLogs] = useState<EnrichedLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (tasksLoading || tasks.length === 0) {
      setLogs([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    Promise.all(
      tasks.map((t) =>
        api.get<LogEntry[]>(`/logs/${t._id}`).then((res) => {
          return res.data.map((log) => ({
            ...log,
            taskTitle: t.title,
            taskDescription: t.description,
            taskPriority: t.priority,
            logUpdatedAt: log.updatedAt,
          }));
        })
      )
    )
      .then((arrays) => {
        setLogs(arrays.flat());
      })
      .catch((err) => console.error("Loglar alınamadı:", err))
      .finally(() => setLoading(false));
  }, [tasks, tasksLoading]);


  // 3) Zaman damgası Date objesine çevir
  const datedLogs = logs.map((l) => ({
    ...l,
    time: parseISO(l.timeStamp),
  }));

  // 4) Zaman dilimlerine göre gruplandır
  const today = new Date();
  const weekAgo = subDays(today, 7);
  const monthEnd = endOfMonth(today);

  const todayLogs = datedLogs.filter((l) => isToday(l.time));
  const lastWeekLogs = datedLogs.filter(
    (l) => isWithinInterval(l.time, { start: weekAgo, end: today }) && !isToday(l.time)
  );
  const thisMonthLogs = datedLogs.filter(
    (l) =>
      isThisMonth(l.time) &&
      l.time < weekAgo &&
      !isToday(l.time)
  );
  const laterLogs = datedLogs.filter((l) => isAfter(l.time, monthEnd));

  const renderGroup = (title: string, group: typeof datedLogs) => (
    <div className="mt-6" key={title}>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <div className="space-y-4">
        {group.map((l) => (
          <ActivityItem
            key={l._id}
            time={l.time.toLocaleTimeString("tr-TR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
            name={l.authorUserId.username}
            initials={l.authorUserId.username
              .split(" ")
              .map((n) => n[0])
              .join("")}
            actionType={l.actionType as ActionType}
            taskTitle={l.taskTitle}
            taskDescription={l.taskDescription}
            taskPriority={l.taskPriority}
            logUpdatedAt={l.logUpdatedAt}
            avatarBg="9c27b0"
            avatarColor="fff"
          />
        ))}
      </div>
    </div>
  );

  if (loading) return <Loading />;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white h-full overflow-y-auto"
    >
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex justify-between mb-4"
      >
        <motion.h1 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold"
        >
          Proje Etkinlikleri
        </motion.h1>
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
      >
        <AnimatePresence>
          {todayLogs.length > 0 && (
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="mt-6"
            >
              {renderGroup("Bugün", todayLogs)}
            </motion.div>
          )}
          {lastWeekLogs.length > 0 && (
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="mt-6"
            >
              {renderGroup("Geçen Hafta", lastWeekLogs)}
            </motion.div>
          )}
          {thisMonthLogs.length > 0 && (
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="mt-6"
            >
              {renderGroup("Bu Ay", thisMonthLogs)}
            </motion.div>
          )}
          {laterLogs.length > 0 && (
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="mt-6"
            >
              {renderGroup("Sonrası", laterLogs)}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default Page;
