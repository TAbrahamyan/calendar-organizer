import { SELECT_DAY, CHANGE_MONTH } from '../../constants/actionTypes';

const daysOfMonth = (days: any, month: number): string[] => {
  const lastDayOfMOnth: number = new Date(new Date().getFullYear(), month + 1, 0).getDate();
  let week: number = 0;
  days[week] = [];

  for (let i = 1; i <= lastDayOfMOnth; i++) {
    if (new Date(new Date().getFullYear(), month, i).getDay() !== 1) {
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

const months = (month: number): string => {
  const monthNames: string[] = [
    'January', 'February', 'March',
    'April', 'May', 'June',
    'July', 'August', 'September',
    'October', 'November', 'December',
  ];

  return monthNames[month];
};

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
