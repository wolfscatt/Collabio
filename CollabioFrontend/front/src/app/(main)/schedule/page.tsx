"use client";

import React, { useState, useRef, useEffect } from "react";
import CalendarGrid, {
  TaskEntry,
} from "../../../../components/ScheduleComps/CalendarGrid";
import NoteModal from "../../../../components/ScheduleComps/NoteModal";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { useProjectTasks } from "@/hooks/useProjectTasks";
import { useSelectedProject } from "@/context/SelectedProjectContext";
import { motion, AnimatePresence } from "framer-motion";

const SchedulePage = () => {
  const today = new Date();
  const { selectedProject } = useSelectedProject();
  const { tasks } = useProjectTasks(!!selectedProject?._id);

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [monthSelectorOpen, setMonthSelectorOpen] = useState(false);
  const [yearSelectorOpen, setYearSelectorOpen] = useState(false);

  const monthRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);


  const calendarTasks: TaskEntry[] = Array.isArray(tasks) ? tasks.map((t) => ({
    date: (t.startDate || t.createdAt).split("T")[0],
    status: t.status as TaskEntry["status"],
    title: t.title,
    assigneeName: t.assignee?.username || "Atanmamış",  // atanan kullanıcı adı
  })) : [];

  const handleDayClick = (date: Date) => {
    setSelectedDate(date.toISOString().split("T")[0]);
    setModalOpen(true);
  };

  const handleSaveNote = (note: string) => {
    if (selectedDate) setNotes({ ...notes, [selectedDate]: note });
    setModalOpen(false);
  };

  const formattedTitle = format(
    new Date(currentYear, currentMonth),
    "MMMM yyyy",
    { locale: tr }
  );

  const handleClickOutside = (e: MouseEvent) => {
    if (monthRef.current && !monthRef.current.contains(e.target as Node)) {
      setMonthSelectorOpen(false);
    }
    if (yearRef.current && !yearRef.current.contains(e.target as Node)) {
      setYearSelectorOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const goToToday = () => {
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
  };
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-[83vw] min-w-[80vw] bg-white ml-[1vh] mt-[1vh] rounded-xl shadow"
    >
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-row items-center justify-between px-[2vh] py-[2vh] border-b border-gray-200"
      >
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex gap-3 items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={goToToday}
            className="bg-[var(--color-primary)] text-white px-[2vh] py-[1vh] rounded-md hover:bg-purple-600 transition"
          >
            Bugün
          </motion.button>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="relative" 
            ref={monthRef}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMonthSelectorOpen(!monthSelectorOpen)}
              className="px-[2vh] py-[1vh] border text-white bg-[var(--color-primary)] rounded-md hover:bg-purple-600 transition"
            >
              {format(new Date(currentYear, currentMonth), 'MMMM', { locale: tr })}
            </motion.button>
            <AnimatePresence>
              {monthSelectorOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full mt-1 bg-white border shadow rounded-md z-10"
                >
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ backgroundColor: "rgb(243 232 255)" }}
                      onClick={() => {
                        setCurrentMonth(i);
                        setMonthSelectorOpen(false);
                      }}
                      className="px-4 py-2 cursor-pointer"
                    >
                      {format(new Date(currentYear, i), 'MMMM', { locale: tr })}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative" 
            ref={yearRef}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setYearSelectorOpen(!yearSelectorOpen)}
              className="px-[2vh] py-[1vh] text-white border bg-[var(--color-primary)] rounded-md hover:bg-purple-600 transition"
            >
              {currentYear}
            </motion.button>
            <AnimatePresence>
              {yearSelectorOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full mt-1 bg-white border shadow rounded-md z-10 max-h-[200px] overflow-y-auto"
                >
                  {[...Array(11)].map((_, i) => {
                    const year = new Date().getFullYear() - 5 + i;
                    return (
                      <motion.div
                        key={year}
                        whileHover={{ backgroundColor: "rgb(243 232 255)" }}
                        onClick={() => {
                          setCurrentYear(year);
                          setYearSelectorOpen(false);
                        }}
                        className="px-4 py-2 cursor-pointer"
                      >
                        {year}
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        <motion.h1 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-[3vh] font-bold text-purple-800 capitalize"
        >
          {formattedTitle}
        </motion.h1>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-6"
      >
        <CalendarGrid
          currentMonth={currentMonth}
          currentYear={currentYear}
          onDayClick={handleDayClick}
          notes={notes}
          tasks={calendarTasks}
        />
      </motion.div>

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <NoteModal
              isOpen={modalOpen}
              date={selectedDate || ''}
              onClose={() => setModalOpen(false)}
              onSave={handleSaveNote}
              initialNote={selectedDate ? notes[selectedDate] : ''}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SchedulePage;
