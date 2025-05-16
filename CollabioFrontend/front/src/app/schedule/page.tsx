'use client'

import React, { useState, useRef, useEffect } from 'react';
import CalendarGrid from '../../../components/ScheduleComps/CalendarGrid';  
import NoteModal from '../../../components/ScheduleComps/NoteModal';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

const SchedulePage = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [monthSelectorOpen, setMonthSelectorOpen] = useState(false);
  const [yearSelectorOpen, setYearSelectorOpen] = useState(false);

  const monthRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);

  const handleDayClick = (date: Date) => {
    const key = date.toISOString().split('T')[0];
    setSelectedDate(key);
    setModalOpen(true);
  };

  const handleSaveNote = (note: string) => {
    if (selectedDate) {
      setNotes({ ...notes, [selectedDate]: note });
    }
    setModalOpen(false);
  };

  const formattedTitle = format(new Date(currentYear, currentMonth), 'MMMM yyyy', {
    locale: tr,
  });

  const handleClickOutside = (e: MouseEvent) => {
    if (monthRef.current && !monthRef.current.contains(e.target as Node)) {
      setMonthSelectorOpen(false);
    }
    if (yearRef.current && !yearRef.current.contains(e.target as Node)) {
      setYearSelectorOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const goToToday = () => {
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
  };

  return (
    <div className="w-[83vw] min-w-[80vw] bg-white ml-[1vh] mt-[1vh] rounded-xl shadow">
      <div className="flex flex-row items-center justify-between px-[2vh] py-[2vh] border-b border-gray-200">
        <div className="flex gap-3 items-center">
          <button
            onClick={goToToday}
            className="bg-[var(--color-primary)] text-white px-[2vh] py-[1vh] rounded-md hover:bg-purple-600 transition"
          >
            Bugün
          </button>

          <div className="relative" ref={monthRef}>
            <button
              onClick={() => setMonthSelectorOpen(!monthSelectorOpen)}
              className="px-[2vh] py-[1vh] border text-white bg-[var(--color-primary)] rounded-md hover:bg-purple-600 transition">
              {format(new Date(currentYear, currentMonth), 'MMMM', { locale: tr })}
            </button>
            {monthSelectorOpen && (
              <div className="absolute top-full mt-1 bg-white border shadow rounded-md z-10">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setCurrentMonth(i);
                      setMonthSelectorOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-purple-100 cursor-pointer"
                  >
                    {format(new Date(currentYear, i), 'MMMM', { locale: tr })}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative" ref={yearRef}>
            <button
              onClick={() => setYearSelectorOpen(!yearSelectorOpen)}
              className="px-[2vh] py-[1vh] text-white border bg-[var(--color-primary)] rounded-md hover:bg-purple-600 transition"
            >
              {currentYear}
            </button>
            {yearSelectorOpen && (
              <div className="absolute top-full mt-1 bg-white border shadow rounded-md z-10 max-h-[200px] overflow-y-auto">
                {[...Array(11)].map((_, i) => {
                  const year = new Date().getFullYear() - 5 + i;
                  return (
                    <div
                      key={year}
                      onClick={() => {
                        setCurrentYear(year);
                        setYearSelectorOpen(false);
                      }}
                      className="px-4 py-2 hover:bg-purple-100 cursor-pointer"
                    >
                      {year}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <h1 className="text-[3vh] font-bold text-purple-800 capitalize">
          {formattedTitle}
        </h1>
      </div>

      <div className="p-6">
        <CalendarGrid
          currentMonth={currentMonth}
          currentYear={currentYear}
          onDayClick={handleDayClick}
          notes={notes}
        />
      </div>

      <NoteModal
        isOpen={modalOpen}
        date={selectedDate || ''}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveNote}
        initialNote={selectedDate ? notes[selectedDate] : ''}
      />
    </div>
  );
};

export default SchedulePage;
