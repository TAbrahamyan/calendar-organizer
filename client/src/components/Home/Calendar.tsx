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

export default ({ selectedDay, setSelectedDay }: ICalendarProps) => {
  return (
    <section className="calendar">
      <div className="calendar__content">
        <h1>{CALENDAR.month} {CALENDAR.year}</h1>
        <table>
          <thead>
            <tr>
              {CALENDAR.weekdays.map((weekday: string, index: number) => <td key={index}>{weekday}</td>)}
            </tr>
          </thead>

          <tbody>
            {CALENDAR.days.map((week: any, weekIndex: number) => (
              <tr key={weekIndex}>
                {week.map((day: string, dayIndex: number) => (
                  <td
                    key={dayIndex}
                    onClick={() => (day !== '' && day !== selectedDay) && setSelectedDay(week[dayIndex])}
                    style={(+day === new Date().getDate()) ? { borderTop: '3px solid rgb(24, 144, 255)' } : {}}
                    className={(day === selectedDay || day === '') ? 'selected' : ''}
                  >{day}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
