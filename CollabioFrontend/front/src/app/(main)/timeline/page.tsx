"use client";

import React, { useState, useEffect } from "react";
import { FaFilter, FaUndo } from "react-icons/fa";
import FilterSelect from "../../../../components/TimelineComps/FilterSelect";
import ActivityItem from "../../../../components/TimelineComps/ActivityItem";
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

const Page: React.FC = () => {
  const { selectedProject } = useSelectedProject();
  const { tasks, loading } = useProjectTasks(!!selectedProject?._id);

  const [filterOpen, setFilterOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState("all");
  const [activity, setActivity] = useState("all");
  const [status, setStatus] = useState("all");

  // Görevleri güncelleyerek Date objesine çevir
  const datedTasks = tasks.map((t) => ({
    ...t,
    updatedAtDate: parseISO(t.updatedAt),
  }));

  const today = new Date();
  const weekAgo = subDays(today, 7);
  const monthEnd = endOfMonth(today);

  const todayTasks = datedTasks.filter((t) => isToday(t.updatedAtDate));
  const lastWeekTasks = datedTasks.filter(
    (t) =>
      isWithinInterval(t.updatedAtDate, { start: weekAgo, end: today }) &&
      !isToday(t.updatedAtDate)
  );
  const thisMonthTasks = datedTasks.filter(
    (t) =>
      isThisMonth(t.updatedAtDate) &&
      t.updatedAtDate < weekAgo &&
      !isToday(t.updatedAtDate)
  );
  const laterTasks = datedTasks.filter((t) => isAfter(t.updatedAtDate, monthEnd));

  const renderGroup = (title: string, group: typeof datedTasks) => (
    <div className="flex flex-col mt-[3vh] gap-[2vw]" key={title}>
      <div className="w-[80vw] border-b-2 py-[1vh]">
        <h1 className="text-[2.5vh] text-[var(--color-dark)] font-semibold">
          {title}
        </h1>
      </div>
      <div className="flex flex-col">
        {group.map((t) => (
          <ActivityItem
            key={t._id}
            time={t.updatedAtDate.toLocaleTimeString("tr-TR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
            name={t.reporter?.username || ""}
            initials={t.reporter?.username
              ?.split(" ")
              .map((n) => n[0])
              .join("")}
            status={t.status.toUpperCase()}
            statusType={t.status === "to-do" ? "yapilacaklar" : t.status === "in-progress" ? "devam-ediyor" : t.status === "done" ? "tamam" : "diğer"}
            course={t.title}
            message={t.description}
            avatarBg="9c27b0"
            avatarColor="fff"
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-[83vw] min-w-[80vw] bg-[var(--color-background)] ml-[1vh] mt-[1vh] rounded-xl">
      <div className="flex flex-col gap-[2vh] mb-[2vh] p-[2vh] bg-white rounded-lg shadow">
        <div className="flex items-center gap-[2vw]">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-[1vh] px-[2vh] py-[1vh] bg-[var(--color-primary)] text-white rounded cursor-pointer text-[1.6vh]"
          >
            <FaFilter /> Filtrele
          </button>
        </div>
        {filterOpen && (
          <div className="flex items-start flex-row gap-[2vh]">
            {/* FilterSelect’ler */}
            <div className="flex gap-[2vh] p-[1vh] text-[1.8vh] mt-[2vh]">
              <button className="flex items-center gap-[0.5vw] px-[2vh] bg-[var(--color-primary)] text-white rounded ">
                Uygula
              </button>
              <button
                onClick={() => {
                  setDateFilter("all");
                  setActivity("all");
                  setStatus("all");
                }}
                className="flex items-center gap-[0.5vw] px-[2vh] py-[0.5vh] bg-white border-[1px] border-black text-black rounded  "
              >
                <FaUndo /> Sıfırla
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col w-[80vw] ml-[1vw] h-[100vh] overflow-y-auto">
        <h1 className="text-[3vh] text-[var(--color-dark)] font-bold">
          Proje Etkinlikleri
        </h1>
        {!loading && (
          <>
            {todayTasks.length > 0 && renderGroup("Bugün", todayTasks)}
            {lastWeekTasks.length > 0 &&
              renderGroup("Geçen Hafta", lastWeekTasks)}
            {thisMonthTasks.length > 0 &&
              renderGroup("Bu Ay", thisMonthTasks)}
            {laterTasks.length > 0 && renderGroup("Sonrası", laterTasks)}
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
