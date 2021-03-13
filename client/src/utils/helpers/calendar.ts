import { ICalendar } from '../types';

export const daysOfMonth = (days: string[][], month: number): string[][] => {
  const lastDayOfMOnth: number = new Date(new Date().getFullYear(), month + 1, 0).getDate();
  let week: number = 0;
  days[week] = [];

  for (let i = 1; i <= lastDayOfMOnth; i++) {
    if (new Date(new Date().getFullYear(), month, i).getDay() !== 1) {
      days[week].push(`${i}`);
    } else {
      week++;
      days[week] = [];
      days[week].push(`${i}`);
    }
  }

  if (days[0].length > 0) {
    for (let i = days[0].length; i < 7; i++) {
      days[0].unshift('');
    }
  }

  const lastWeek: string[] = days[days.length - 1];
  if (lastWeek.length !== 7) {
    for (let i = lastWeek.length; i < 7; i++) {
      lastWeek.push('');
    }
  }

  return days;
};

export const months = (month: number): string => {
  const monthNames: string[] = [
    'January', 'February', 'March',
    'April', 'May', 'June',
    'July', 'August', 'September',
    'October', 'November', 'December',
  ];

  return monthNames[month];
};

export const checkInvalidDays = (calendar: ICalendar): boolean => {
  return new Date(`${calendar.month} ${calendar.selectedDay} ${calendar.year}`).getTime()
    >= new Date(new Date().toDateString()).getTime();
};
