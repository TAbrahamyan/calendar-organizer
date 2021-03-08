import React from 'react';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';
import { LeftCircleFilled, RightCircleFilled } from '@ant-design/icons';
import { SELECT_DAY, CHANGE_MONTH } from '../../utils/constants/actionTypes';

const Calendar: React.FC<any> = ({ calendarStore, taskStore, selectDay, changeMonth }) => {
  const [ month, setMonth ] = React.useState<number>(new Date().getMonth());

  const changeMonthHandler = (newMonthIndex: number): void => {
    const newMonth: number = newMonthIndex;
    setMonth(newMonth);
    changeMonth(newMonth);
    selectDay('1');
  };

  const daysClasses = (day: string): string => {
    if (day === calendarStore.selectedDay) {
      return 'selected';
    }

    if (day === '') {
      return 'invalid-days';
    }

    if (taskStore.tasks.some((task: any) => task.createdDay === day)) {
      return 'task-days';
    }

    return '';
  };

  return (
    <section className="calendar">
      <div className="calendar__content">
        <div>
          {month > 0 && <LeftCircleFilled onClick={() => changeMonthHandler(month - 1)} />}
          <h1 style={{ margin: '0 auto' }}>{calendarStore.month} {calendarStore.year}</h1>
          {month < 11 && <RightCircleFilled onClick={() => changeMonthHandler(month + 1)} />}
        </div>

        <table>
          <thead>
            <tr>
              {calendarStore.weekdays.map((weekday: string) => <td key={nanoid()}>{weekday}</td>)}
            </tr>
          </thead>

          <tbody>
            {calendarStore.days.map((week: any) => (
              <tr key={nanoid()}>
                {week.map((day: string, dayIndex: number) => (
                  <td
                    key={nanoid()}
                    onClick={() => (day !== calendarStore.selectedDay && day !== '') && selectDay(week[dayIndex])}
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
};

const mapStateToProps = (state: any) => ({
  calendarStore: state.calendar,
  taskStore: state.task,
});

const mapDispatchToProps = (dispatch: any) => ({
  selectDay: (payload: any) => dispatch({ type: SELECT_DAY, payload }),
  changeMonth: (payload: any) => dispatch({ type: CHANGE_MONTH, payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
