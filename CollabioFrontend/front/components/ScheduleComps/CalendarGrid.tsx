import React, { useEffect } from 'react';
import { FaFlag, FaMoon, FaStar } from 'react-icons/fa';
import useCalendar, { CalendarDay } from "../../src/hooks/useCalendar";
interface CalendarGridProps {
    currentMonth: number;
    currentYear: number;
    onDayClick: (date: Date) => void;
    notes: Record<string, string>;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
    currentMonth,
    currentYear,
    onDayClick,
    notes,
}) => {
    const { getCalendarDays } = useCalendar();

    const days: CalendarDay[] = getCalendarDays(currentMonth, currentYear);
    const dayNames = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

    const getBadge = (type: string | null) => {
        switch (type) {
            case 'holiday':
                return <FaFlag className="text-white text-[0.7vw]" />;
            case 'religious':
                return <FaMoon className="text-white text-[0.7vw]" />;
            case 'special':
                return <FaStar className="text-white text-[0.7vw]" />;
            default:
                return null;
        }
    };

    useEffect(() => {
        const handleScroll = (e: WheelEvent) => {
            // scroll listener boşta bekletiliyor (isteğe bağlı kullanım için)
        };
        const area = document.getElementById('calendar-scroll-area');
        if (area) {
            area.addEventListener('wheel', handleScroll);
            return () => area.removeEventListener('wheel', handleScroll);
        }
    }, []);

    return (
        <div id="calendar-scroll-area" className="grid grid-cols-7 gap-px bg-white">
            {dayNames.map((day, idx) => (
                <div
                    key={idx}
                    className="bg-white text-center font-semibold py-2 text-sm text-purple-800"
                >
                    {day}
                </div>
            ))}

            {days.map((d, idx) => {
                const dateKey = d.date.toISOString().split('T')[0];
                const hasNote = notes[dateKey];

                return (
                    <div
                        key={idx}
                        onClick={() => onDayClick(d.date)}
                        className={`relative min-h-[10vh] p-2 text-sm rounded-xl shadow-2xl border-[var(--color-primary)] border-[1px] bg-white flex flex-row items-start justify-between
                ${d.isCurrentMonth ? '' : 'bg-white text-gray-400'}
                ${d.isToday ? 'ring-2 ring-purple-400 text-purple-400' : ''}`}
                    >
                        <div className="text-[1vw] text-[var(--color-light)] mb-1">
                            {d.day}
                        </div>

                        {d.holidayType && (
                            <div
                                className={`
                    w-[1.5vw] h-[1.5vw] rounded-full flex items-center justify-center
                    ${d.holidayType === 'holiday' && 'bg-red-500'}
                    ${d.holidayType === 'religious' && 'bg-green-500 text-black'}
                    ${d.holidayType === 'special' && 'bg-yellow-500 text-black'}
                  `}
                                title={d.holidayName}
                            >
                                {getBadge(d.holidayType)}
                            </div>
                        )}

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