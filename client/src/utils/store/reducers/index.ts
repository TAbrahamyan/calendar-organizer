import { combineReducers } from 'redux';

import userReducer from './user';
import calendarReducer from './calendar';
import taskReducer from './task';

export default combineReducers({
  user: userReducer,
  calendar: calendarReducer,
  task: taskReducer,
});
