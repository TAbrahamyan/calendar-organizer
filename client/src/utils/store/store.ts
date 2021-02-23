import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import task from './reducers/task';

export default createStore(
  task,
  applyMiddleware(thunk),
);
