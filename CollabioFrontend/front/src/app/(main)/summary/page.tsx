"use client"
import React, { useMemo, useState } from "react";
import { FaFilter, FaChartPie, FaHistory, FaCalendarAlt, FaUsers } from "react-icons/fa";
import FilterBarText from "../../../../components/SummaryComps/FilterBarText";
import GridTitle from "../../../../components/SummaryComps/GridTitle";
import OncomingTaskRow from "../../../../components/SummaryComps/OncomingTaskRow";
import TaskDistribution from "../../../../components/SummaryComps/TaskDistribution";
import ActivityItem from "../../../../components/SummaryComps/ActivityItem";
import StatusDonutChart from "../../../../components/SummaryComps/StatusDonutChart";
import ProtectedRoute from "../../../../components/ProtectedRoute";
import { useProjectTasks } from "@/hooks/useProjectTasks";
import { tr } from "date-fns/locale";
import { formatDistanceToNow, format } from "date-fns";
import { useProjectActivity } from "@/hooks/useProjectActivity";
import { ActionType } from "@/types/log";
import { motion, AnimatePresence } from "framer-motion";

const Summary = () => {
  const [dayRange, setDayRange] = useState(7);
  const { entries } = useProjectActivity();
  const { tasks } = useProjectTasks();

  const isWithinLastNDays = (dateStr?: string, n: number = 7) => {
    if (!dateStr) return false;
    const date = new Date(dateStr);
    const now = new Date();
    const nDaysAgo = new Date(now);
    nDaysAgo.setDate(now.getDate() - n);
    return date >= nDaysAgo && date <= now;
  };

  const isDueInNextNDays = (dateStr?: string, n: number = 7) => {
    if (!dateStr) return false;
    const date = new Date(dateStr);
    const now = new Date();
    const nDaysLater = new Date(now);
    nDaysLater.setDate(now.getDate() + n);
    return date >= now && date <= nDaysLater;
  };

  const completedCount = useMemo(() =>
    tasks.filter(
      (task) => task.status === "done" && isWithinLastNDays(task.updatedAt, dayRange)
    ).length
    , [tasks, dayRange]);

  const updatedCount = useMemo(() =>
    tasks.filter(
      (task) => isWithinLastNDays(task.updatedAt, dayRange)
    ).length
    , [tasks, dayRange]);

  const createdCount = useMemo(() =>
    tasks.filter(
      (task) => isWithinLastNDays(task.createdAt, dayRange)
    ).length
    , [tasks, dayRange]);

  const dueSoonCount = useMemo(() =>
    tasks.filter(
      (task) => isDueInNextNDays(task.endDate, dayRange)
    ).length
    , [tasks, dayRange]);


  const statusData = {
    yapılacak: tasks.filter(task => task.status === "to-do").length,
    devam: tasks.filter(task => task.status === "in-progress").length,
    tamam: tasks.filter(task => task.status === "done").length,
  };

  const upcomingTasks = tasks
    .filter(task => {
      if (!task.endDate) return false;
      const now = new Date();
      const end = new Date(task.endDate);
      return end > now;
    })
    .sort((a, b) => new Date(a.endDate!).getTime() - new Date(b.endDate!).getTime()) // en erken bitiş tarihi
    .slice(0, 4);
  const userTaskMap: Record<
    string,
    {
      name: string;
      avatarUrl: string;
      counts: { [key: string]: number };
    }
  > = {};

  tasks.forEach((task) => {
    const username = task.assignee?.username || "Atanmamış";
    const initials =
      task.assignee?.username
        ?.split(" ")
        .map((n) => n[0])
        .join("") || "??";
    const avatarUrl = `https://ui-avatars.com/api/?name=${initials}&background=18a0fb&color=fff`;

    const statusLabel =
      task.status === "to-do"
        ? "Yapılacak"
        : task.status === "in-progress"
          ? "Devam Ediyor"
          : task.status === "done"
            ? "Tamamlandı"
            : "Bilinmiyor";

    if (!userTaskMap[username]) {
      userTaskMap[username] = {
        name: username,
        avatarUrl,
        counts: {
          "Yapılacak": 0,
          "Devam Ediyor": 0,
          "Tamamlandı": 0,
        },
      };
    }

    if (userTaskMap[username].counts[statusLabel] !== undefined) {
      userTaskMap[username].counts[statusLabel]++;
    }
  });

  return (
    <ProtectedRoute>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gradient-to-br from-purple-50 to-white p-6"
      >
        <div className="max-w-7xl mx-auto">
          {/* Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-5 mb-6 p-6 bg-white rounded-xl shadow-lg"
          >
            <motion.div
              className="flex flex-col items-center text-white bg-purple-600 rounded-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-sm flex items-center px-3 py-2 gap-2 font-medium">
                <FaFilter /> Filtrele
              </div>
              <select
                id="task-day-filter"
                name="dayRange"
                value={dayRange}
                onChange={(e) => setDayRange(Number(e.target.value))}
                className="flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="3">Son 3 Gün</option>
                <option value="7">Son 7 Gün</option>
                <option value="30">Son 30 Gün</option>
              </select>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex gap-4"
            >
              <FilterBarText text={`${completedCount} öğe tamamlandı`} dayRange={dayRange} />
              <FilterBarText text={`${updatedCount} öğe güncellendi`} dayRange={dayRange} />
              <FilterBarText text={`${createdCount} öğe oluşturuldu`} dayRange={dayRange} />
              <motion.div
                className="flex flex-col gap-1 bg-purple-50 p-3 rounded-lg"
                whileHover={{ scale: 1.02 }}
              >
                <span className="text-sm font-medium text-purple-700">
                  {dueSoonCount} öğenin bitiş tarihi yaklaştı
                </span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Status Overview Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-[2.5vh] w-[2vw] text-purple-600">
                    <FaChartPie className="text-[3vh] text-purple-600" />
                  </div>
                  <GridTitle
                    title="Durum genel bakışı"
                    text="Konularınız durumunu anlık olarak görün."
                    isShowAll={false}
                  />
                </div>
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <StatusDonutChart data={statusData} />
                </motion.div>
              </div>
            </motion.div>

            {/* Recent Activities Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-[2.5vh] w-[2vw] text-purple-600">
                    <FaHistory className="text-[3vh] text-purple-600" />
                  </div>
                  <GridTitle
                    title="En son etkinlikleriniz"
                    text="Proje genelinde neler olduğundan haberdar olun."
                    isShowAll={true}
                  />
                </div>
                <motion.div
                  className="h-[50vh] overflow-y-auto pr-2 space-y-4"
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
                    {[...entries]
                      .sort((a, b) =>
                        new Date(b.timestampDate).getTime() - new Date(a.timestampDate).getTime()
                      )
                      .map((task, index) => {
                        const timeAgoText = formatDistanceToNow(
                          new Date(task.timestampDate),
                          { addSuffix: true, locale: tr }
                        );
                        return (
                          <motion.div
                            key={task.logId}
                            variants={{
                              hidden: { opacity: 0, y: 20 },
                              visible: { opacity: 1, y: 0 }
                            }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <ActivityItem
                              name={task.authorName || "Atanmamış"}
                              avatarUrl={`https://ui-avatars.com/api/?name=${task.authorInitials}&background=ffd600&color=333`}
                              actionType={task.actionType as ActionType}
                              taskTitle={task.taskTitle}
                              description={task.taskDescription || "Açıklama girilmemiş."}
                              timeAgo={timeAgoText}
                            />
                          </motion.div>
                        );
                      })}
                  </AnimatePresence>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Second Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Upcoming Tasks Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-[2.5vh] w-[2vw] text-purple-600">
                    <FaCalendarAlt className="text-[3vh] text-purple-600" />
                  </div>
                  <GridTitle
                    title="Yaklaşan Görevler"
                    text="Yaklaşan bitiş tarihleri olan görevler"
                  />
                </div>
                <motion.div
                  className="space-y-4"
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
                  {upcomingTasks.map((task, index) => (
                    <motion.div
                      key={task._id}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 }
                      }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <OncomingTaskRow
                        mission={task.title}
                        name={task.assignee?.username || "Atanmamış"}
                        date={format(new Date(task.endDate!), "d MMM yyyy", { locale: tr })}
                        status={
                          task.status === "to-do"
                            ? "YAPILACAKLAR"
                            : task.status === "in-progress"
                              ? "DEVAM EDİYOR"
                              : task.status === "done"
                                ? "TAMAM"
                                : "BİLİNMİYOR"
                        }
                        avatarUrl={`https://ui-avatars.com/api/?name=${task.assignee?.username?.split(" ").map(n => n[0]).join("") || "??"}&background=18a0fb&color=fff`}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* Task Distribution Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <FaUsers className="w-6 h-6 text-purple-600" />
                  <GridTitle
                    title="Görev Dağılımı"
                    text="Takım üyelerinin görev durumları"
                  />
                </div>
                <motion.div
                  className="space-y-4"
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
                  {Object.values(userTaskMap).map((user, index) => (
                    <motion.div
                      key={user.name}
                      variants={{
                        hidden: { opacity: 0, x: 20 },
                        visible: { opacity: 1, x: 0 }
                      }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <TaskDistribution
                        name={user.name}
                        avatarUrl={user.avatarUrl}
                        tasks={Object.entries(user.counts)
                          .filter(([, count]) => count > 0)
                          .map(([label, count]) => ({
                            label,
                            count,
                          }))}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </ProtectedRoute>
  );
};

export default Summary;
