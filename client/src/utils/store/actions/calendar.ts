import { SELECT_DAY, CHANGE_MONTH } from '../../constants/actionTypes';

export const selectDay = (payload: any) => ({
  type: SELECT_DAY,
  payload,
});

export const changeMonth = (payload: any) => ({
  type: CHANGE_MONTH,
  payload,
});
