import React from 'react';
import { nanoid } from 'nanoid';
import { ICalendar } from '../../../../utils/types';

interface ITableProps {
  calendar: ICalendar;
  selectDayHandler: (day: string, week: string[], dayIndex: number) => void;
  daysClasses: (day: string) => string;
}

const Table: React.FC<ITableProps> = ({ calendar, selectDayHandler, daysClasses }) => {
  return (
    <table>
      <thead>
        <tr>
          {calendar.weekdays.map((weekday: string) => <td key={nanoid()}>{weekday}</td>)}
        </tr>
      </thead>

      <tbody>
        {calendar.days.map((week: string[]) => (
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
