import React from 'react';
import { nanoid } from 'nanoid';

const Table: React.FC<any> = ({ calendar, selectDayHandler, daysClasses }) => {
  return (
    <table>
      <thead>
        <tr>
          {calendar.weekdays.map((weekday: string) => <td key={nanoid()}>{weekday}</td>)}
        </tr>
      </thead>

      <tbody>
        {calendar.days.map((week: any) => (
          <tr key={nanoid()}>
            {week.map((day: string, dayIndex: number) => (
              <td
                key={nanoid()}
                onClick={() => selectDayHandler(day, week, dayIndex)}
                className={daysClasses(day)}
              >{day}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
