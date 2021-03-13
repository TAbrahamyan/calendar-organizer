import { SELECT_DAY, CHANGE_MONTH } from '../../constants/actionTypes';

export const selectDay = (payload: string) => ({
  type: SELECT_DAY,
  payload,
});

export const changeMonth = (payload: number) => ({
  type: CHANGE_MONTH,
  payload,
});
