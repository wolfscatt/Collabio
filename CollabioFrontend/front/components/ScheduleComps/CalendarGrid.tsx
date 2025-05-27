"use client";

import React, { useEffect } from "react";
import {
    FaFlag,
    FaMoon,
    FaStar,
    FaClock,
    FaSpinner,
    FaPause,
    FaCheck,
} from "react-icons/fa";
import useCalendar, { CalendarDay } from "../../src/hooks/useCalendar";

export interface TaskEntry {
    date: string; // "YYYY-MM-DD"
    status: "to-do" | "in-progress" | "pending" | "done";
    title: string;
    assigneeName: string;   // burayı ekliyoruz
}
interface CalendarGridProps {
    currentMonth: number;
    currentYear: number;
    onDayClick: (date: Date) => void;
    notes: Record<string, string>;
    tasks: TaskEntry[];
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
    currentMonth,
    currentYear,
    onDayClick,
    notes,
    tasks,
}) => {
    const { getCalendarDays } = useCalendar();
    const days: CalendarDay[] = getCalendarDays(currentMonth, currentYear);
    const dayNames = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

    // dateKey → list of tasks
    const tasksMap: Record<string, TaskEntry[]> = {};
    tasks.forEach((t) => {
        tasksMap[t.date] = tasksMap[t.date] || [];
        tasksMap[t.date].push(t);
    });

    const getHolidayBadge = (type: string) => {
        switch (type) {
            case "holiday":
                return <FaFlag className="text-white text-[0.7vw]" />;
            case "religious":
                return <FaMoon className="text-white text-[0.7vw]" />;
            case "special":
                return <FaStar className="text-white text-[0.7vw]" />;
            default:
                return null;
        }
    };

    const getTaskBadge = (status: TaskEntry["status"]) => {
        switch (status) {
            case "to-do":
                return <FaClock className="text-white text-[0.7vw]" />;
            case "in-progress":
                return (
                    <FaSpinner className="text-white text-[0.7vw]" />
                );
            case "pending":
                return <FaPause className="text-white text-[0.7vw]" />;
            case "done":
                return <FaCheck className="text-white text-[0.7vw]" />;
            default:
                return null;
        }
    };

    useEffect(() => {
        const area = document.getElementById("calendar-scroll-area");
        const handleScroll = () => { };
        if (area) {
            area.addEventListener("wheel", handleScroll);
            return () => area.removeEventListener("wheel", handleScroll);
        }
    }, []);

    return (
        <div
            id="calendar-scroll-area"
            className="grid grid-cols-7 gap-px bg-white"
        >
            {dayNames.map((day, idx) => (
                <div
                    key={idx}
                    className="bg-white text-center font-semibold py-2 text-sm text-purple-800"
                >
                    {day}
                </div>
            ))}

            {days.map((d, idx) => {
                const dateKey = d.date.toISOString().split("T")[0];
                const hasNote = Boolean(notes[dateKey]);
                const dayTasks = tasksMap[dateKey] ?? [];
                const firstTask = dayTasks.length > 0 ? dayTasks[0] : undefined;

                return (
                    <div
                        key={idx}
                        onClick={() => onDayClick(d.date)}
                        className={`relative min-h-[10vh] p-2 text-sm rounded-xl shadow-2xl border-[var(--color-primary)] border-[1px] bg-white flex flex-row items-start justify-between
                           ${!d.isCurrentMonth ? "bg-white text-gray-400" : ""}
                           ${d.isToday ? "ring-2 ring-purple-400 text-purple-400" : ""}
                         `}
                    >
                        <div className="text-[1vw] text-[var(--color-light)] mb-1">
                            {d.day}
                        </div>

                        {d.holidayType && (
                            <div
                                className={`
                                    w-[1.5vw] h-[1.5vw] rounded-full flex items-center justify-center
                                    ${d.holidayType === "holiday" && "bg-red-500"}
                                    ${d.holidayType === "religious" && "bg-green-500 text-black"}
                                    ${d.holidayType === "special" && "bg-yellow-500 text-black"}
                                  `}
                                title={d.holidayName}
                            >
                                {getHolidayBadge(d.holidayType)}
                            </div>
                        )}
                        {firstTask ? (
                            <div
                                className="absolute bottom-1 left-1 w-[1.5vw] h-[1.5vw] rounded-full bg-blue-500 flex items-center justify-center"
                                title={`${firstTask.title} – Sorumlu: ${firstTask.assigneeName} – ${firstTask.status}`}
                            >
                                {getTaskBadge(firstTask.status)}
                            </div>
                        ) : null}

                        {hasNote && (
                            <div className="absolute top-1 right-1 bg-purple-500 text-white text-[0.65rem] px-2 py-[2px] rounded-md">
                                Not
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default CalendarGrid;
