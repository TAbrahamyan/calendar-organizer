interface ICalendarProps {
  selectedDay: string | number;
  setSelectedDay: (selectedDay: string | number) => void;
}

interface ICALENDAR {
  year: number;
  month: string;
  weekdays: string[];
  days: (string | number)[][];
}

const daysOfMonth = (): (string | number)[][] => {
  const date: Date = new Date();
  const days: (string | number)[][] = [];
  const lastDayOfMOnth: number = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  let week: number = 0;
  days[week] = [];

  for (let i = 1; i <= lastDayOfMOnth; i++) {
    if (new Date(date.getFullYear(), date.getMonth(), i).getDay() !== 1) {
      days[week].push(i);
    } else {
      week++;
      days[week] = [];
      days[week].push(i);
    }
  }

  if (days[0].length > 0) {
    for (let i = days[0].length; i < 7; i++) {
      days[0].unshift('');
    }
  }

  const lastWeek: (string | number)[] = days[days.length - 1];
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
  days: daysOfMonth(),
};

export default ({ selectedDay, setSelectedDay }: ICalendarProps) => {
  return (
    <section className="calendar">
      <div className="calendar__content">
        <h1>{CALENDAR.month} {CALENDAR.year}</h1>
        <table>
          <thead>
            <tr>
              {CALENDAR.weekdays.map((weekday, index) => <td key={index}>{weekday}</td>)}
            </tr>
          </thead>

          <tbody>
            {CALENDAR.days.map((week, weekIndex) => (
              <tr key={weekIndex}>
                {week.map((day, dayIndex) => (
                  <td
                    key={dayIndex}
                    onClick={() => day !== '' && setSelectedDay(week[dayIndex])}
                    style={day === new Date().getDate() ? { borderTop: '3px solid rgb(24, 144, 255)' } : {}}
                    className={day === selectedDay || day === '' ? 'selected' : ''}
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
