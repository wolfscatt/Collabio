
export type DayType = 'holiday' | 'religious' | 'special' | null;

export interface CalendarDay {
  date: Date;
  day: number;
  isToday: boolean;
  isCurrentMonth: boolean;
  holidayType: DayType;
  holidayName?: string;
}

const useCalendar = () => {
  const today = new Date();

  const holidays: Record<string, { name: string; type: DayType }> = {
    '1-1': { name: 'Yılbaşı', type: 'holiday' },
    '4-23': { name: 'Ulusal Egemenlik ve Çocuk Bayramı', type: 'holiday' },
    '5-1': { name: 'Emek ve Dayanışma Günü', type: 'holiday' },
    '5-19': { name: 'Gençlik ve Spor Bayramı', type: 'holiday' },
    '7-15': { name: 'Demokrasi ve Milli Birlik Günü', type: 'holiday' },
    '8-30': { name: 'Zafer Bayramı', type: 'holiday' },
    '10-29': { name: 'Cumhuriyet Bayramı', type: 'holiday' },
    '2-14': { name: 'Sevgililer Günü', type: 'special' },
    '3-8': { name: 'Dünya Kadınlar Günü', type: 'special' },
    '5-11': { name: 'Anneler Günü', type: 'special' },
    '6-15': { name: 'Babalar Günü', type: 'special' },
    '9-1': { name: 'Okul Açılış Günü', type: 'special' },
    '11-24': { name: 'Öğretmenler Günü', type: 'special' },
  };

  const getHoliday = (day: number, month: number) => {
    const key = `${month + 1}-${day}`;
    return holidays[key] || null;
  };

  const getCalendarDays = (month: number, year: number): CalendarDay[] => {
    const days: CalendarDay[] = [];
    const firstDayOfMonth = new Date(year, month, 1);
    const startDay = (firstDayOfMonth.getDay() + 6) % 7; // Pazartesi = 0
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    for (let i = startDay - 1; i >= 0; i--) {
      const day = prevMonthDays - i;
      const date = new Date(year, month - 1, day);
      days.push({
        date,
        day,
        isToday: false,
        isCurrentMonth: false,
        holidayType: null,
      });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const isToday =
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();
      const holiday = getHoliday(i, month);

      days.push({
        date,
        day: i,
        isToday,
        isCurrentMonth: true,
        holidayType: holiday?.type || null,
        holidayName: holiday?.name,
      });
    }

    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      const date = new Date(year, month + 1, i);
      days.push({
        date,
        day: i,
        isToday: false,
        isCurrentMonth: false,
        holidayType: null,
      });
    }

    return days;
  };

  return {
    getCalendarDays,
  };
};

export default useCalendar;
