import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { LeftCircleFilled, RightCircleFilled } from '@ant-design/icons';
import { selectDay, changeMonth } from '../../../utils/store/actions/calendar';
import { ICalendar, ITasks } from '../../../utils/types';
import { Table } from './components';

interface ICalendarRrops {
  calendar: ICalendar;
  tasks: ITasks[];
}

const Calendar: React.FC<ICalendarRrops> = ({ calendar, tasks }) => {
  const dispatch = useDispatch();
  const [ month, setMonth ] = React.useState<number>(new Date().getMonth());

  const changeMonthHandler = (newMonthIndex: number): void => {
    const newMonth: number = newMonthIndex;
    setMonth(newMonth);
    dispatch(changeMonth(newMonth));
    dispatch(selectDay('1'));
  };

  const selectDayHandler = (day: string, week: string[], dayIndex: number): void => {
    if (day !== calendar.selectedDay && day !== '') {
      dispatch(selectDay(week[dayIndex]));
    }
  };

  const daysClasses = (day: string): string => {
    if (day === calendar.selectedDay) {
      return 'selected';
    }

    if (day === '') {
      return 'invalid-days';
    }

    if (tasks.some((task: ITasks) => task.createdDay === day && task.createdMonth === calendar.month)) {
      return 'task-days';
    }

    return '';
  };

  return (
    <section className="calendar">
      <div className="calendar__content">
        <div>
          {month > 0 && <LeftCircleFilled onClick={() => changeMonthHandler(month - 1)} />}
          <h1 style={{ margin: '0 auto' }}>{calendar.month} {calendar.year}</h1>
          {month < 11 && <RightCircleFilled onClick={() => changeMonthHandler(month + 1)} />}
        </div>

        <Table
          calendar={calendar}
          selectDayHandler={selectDayHandler}
          daysClasses={daysClasses}
        />
      </div>
    </section>
  );
};

const mapState = (state: any) => ({
  calendar: state.calendar,
  tasks: state.task.tasks,
});

export default connect(mapState)(Calendar);
