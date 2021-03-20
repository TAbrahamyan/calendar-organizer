import { SELECT_DAY, CHANGE_MONTH } from '../../constants/actionTypes';
import { daysOfMonth, months } from '../../helpers/calendar';
import { ICalendar, IAction } from '../../types';

const initialState: ICalendar = {
  year: new Date().getFullYear(),
  weekdays: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
  selectedDay: `${new Date().getDate()}`,
  month: months(new Date().getMonth()),
  days: daysOfMonth([], new Date().getMonth()),
};

const calendarReducer = (state: ICalendar = initialState, action: IAction) => {
  switch (action.type) {
    case SELECT_DAY:
      return {
        ...state,
        selectedDay: action.payload,
      };
    case CHANGE_MONTH:
      return {
        ...state,
        month: months(action.payload),
        days: daysOfMonth([], action.payload),
      };
    default:
      return state;
  }
};

export default calendarReducer;
