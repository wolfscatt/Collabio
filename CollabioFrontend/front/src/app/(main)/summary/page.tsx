"use client"
import React, { useMemo, useState } from "react";
import { FaFilter } from "react-icons/fa";
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

const Summary = () => {
  const [dayRange, setDayRange] = useState(7);

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
  const doneTasks = tasks.filter(task => task.status === "done");

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
      <div className="bg-[var(--color-background)] w-[83vw] ml-[1vh] mt-[1vh]">
        <div className="flex items-center gap-5 mb-5 p-4 bg-white rounded-lg shadow">
          <div className="flex flex-col items-center text-white bg-[var(--color-primary)] rounded-lg">
            <div className="text-sm flex items-center px-2 py-1 gap-2 font-medium">
              <FaFilter /> Filtrele
            </div>
            <select
              id="task-day-filter"
              name="dayRange"
              value={dayRange}
              onChange={(e) => setDayRange(Number(e.target.value))}
              className="flex items-center gap-2 px-2 py-1 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer"
            >
              <option value="3">3</option>
              <option value="7">7</option>
              <option value="30">30</option>
            </select>
          </div>
          <FilterBarText text={`${completedCount} öğe tamamlandı`} dayRange={dayRange} />
          <FilterBarText text={`${updatedCount} öğe güncellendi`} dayRange={dayRange} />
          <FilterBarText text={`${createdCount} öğe oluşturuldu`} dayRange={dayRange} />
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-[var(--color-dark)]">
              {dueSoonCount} öğenin bitiş tarihi yaklaştı
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Durum Genel Bakışı Kartı */}
          <div className="bg-white rounded-lg shadow">
            <GridTitle
              title="Durum genel bakışı"
              text="Konularınız durumunu anlık olarak görün."
              isShowAll={false}
            />
            <StatusDonutChart data={statusData} />
          </div>

          {/* En Son Etkinlikler Kartı */}
          <div className="bg-white rounded-lg shadow">
            <GridTitle
              title="En son etkinlikleriniz"
              text="Proje genelinde neler olduğundan haberdar olun."
              isShowAll={true}
            />
            {doneTasks.map((task) => {
              const timeAgoText = formatDistanceToNow(new Date(task.updatedAt), {
                addSuffix: true,
                locale: tr,
              });
              return (
                <ActivityItem
                  key={task._id}
                  name={task.assignee?.username || "Atanmamış"}
                  avatarUrl={`https://ui-avatars.com/api/?name=${task.assignee?.username?.split(" ").map(n => n[0]).join("") || "??"}&background=ffd600&color=333`}
                  status="TAMAM"
                  taskTitle={task.title}
                  description={task.description || "Açıklama girilmemiş."}
                  timeAgo={timeAgoText}
                />
              )
            })}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Yaklaşan Görevler Kartı */}
          <div className="bg-white rounded-lg shadow">
            <GridTitle
              title="Yaklaşan Görevler"
              text="Yaklaşan bitiş tarihleri olan görevler"
            />
            <div className="px-5">
              {upcomingTasks.map((task) => (
                <OncomingTaskRow
                  key={task._id}
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
              ))}
            </div>
          </div>


          {/* Görev Dağılımı Kartı */}
          <div className="bg-white rounded-lg shadow">
            <GridTitle
              title="Görev Dağılımı"
              text="Takım üyelerinin görev durumları"
            />
            <div className="p-5 space-y-4">
              {/* Üye 1 */}
              {Object.values(userTaskMap).map((user) => (
                <TaskDistribution
                  key={user.name}
                  name={user.name}
                  avatarUrl={user.avatarUrl}
                  tasks={Object.entries(user.counts)
                    .filter(([, count]) => count > 0)
                    .map(([label, count]) => ({
                      label,
                      count,
                    }))}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Summary;
