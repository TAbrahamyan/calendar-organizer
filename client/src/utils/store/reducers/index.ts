import { combineReducers } from 'redux';
import user from './user';
import calendar from './calendar';
import task from './task';

export default combineReducers({
  user, calendar, task,
});
