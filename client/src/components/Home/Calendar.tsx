import React from 'react';
import { nanoid } from 'nanoid';

interface ICalendarProps {
  selectedDay: string;
  setSelectedDay: (selectedDay: string) => void;
}

interface ICALENDAR {
  year: number;
  month: string;
  weekdays: string[];
  days: string[];
}

const daysOfMonth = (days: any): string[] => {
  const date: Date = new Date();
  const lastDayOfMOnth: number = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  let week: number = 0;
  days[week] = [];

  for (let i = 1; i <= lastDayOfMOnth; i++) {
    if (new Date(date.getFullYear(), date.getMonth(), i).getDay() !== 1) {
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

const CALENDAR: ICALENDAR = {
  year: new Date().getFullYear(),
  month: new Date().toLocaleString('default', { month: 'long' }),
  weekdays: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
  days: daysOfMonth([]),
};

export default React.memo(({ selectedDay, setSelectedDay }: ICalendarProps) => {
  const daysClasses = (day: string): string => {
    if (day === selectedDay) {
      return 'selected';
    }

    if (new Date().getDate() > +day || day === '') {
      return 'invalid-days';
    }

    return '';
  };

  return (
    <section className="calendar">
      <div className="calendar__content">
        <h1>{CALENDAR.month} {CALENDAR.year}</h1>
        <table>
          <thead>
            <tr>
              {CALENDAR.weekdays.map((weekday: string) => <td key={nanoid()}>{weekday}</td>)}
            </tr>
          </thead>

          <tbody>
            {CALENDAR.days.map((week: any) => (
              <tr key={nanoid()}>
                {week.map((day: string, dayIndex: number) => (
                  <td
                    key={nanoid()}
                    onClick={() => (day !== selectedDay && day !== '') && setSelectedDay(week[dayIndex])}
                    className={daysClasses(day)}
                  >{day}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
});
