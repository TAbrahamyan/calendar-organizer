import React from 'react';

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

  const lastWeek: (string | number)[] = days[days.length -1];
  if (lastWeek.length !== 7) {
    for (let i = lastWeek.length; i < 7; i++) {
      lastWeek.push('');
    }
  }

  return days;
};

export default () => {
  const [ selectedDay, setSelectedDay ] = React.useState<string | number>(new Date().getDate());
  const [ date, setDate ] = React.useState({
    year: new Date().getFullYear(),
    month: new Date().toLocaleString('default', { month: 'long' }),
    weekdays: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
    days: daysOfMonth(),
  });

  return (
    <div className="calendar">
      <table>
        <thead>
          <tr>
            {date.weekdays.map((weekday, index) => <td key={index}>{weekday}</td>)}
          </tr>
        </thead>

        <tbody>
          {date.days.map((week, weekIndex) => (
            <tr key={weekIndex}>
              {week.map((day, dayIndex) => (
                <td
                  key={dayIndex}
                  onClick={() => setSelectedDay(week[dayIndex])}
                  style={day === new Date().getDate() ? { borderTop: '3px solid rgb(24, 144, 255)' } : {}}
                  className={day === selectedDay || day === '' ? 'selected' : ''}
                >{day}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
