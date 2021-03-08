import { SELECT_DAY, CHANGE_MONTH } from '../../constants/actionTypes';
import { daysOfMonth, months } from '../../helpers/calendar';

const initialState = {
  year: new Date().getFullYear(),
  weekdays: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
  selectedDay: `${new Date().getDate()}`,
  month: months(new Date().getMonth()),
  days: daysOfMonth([], new Date().getMonth()),
};

export default (state: any = initialState, action: any) => {
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
