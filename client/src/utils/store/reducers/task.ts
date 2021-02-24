import {
  ON_INPUT_CHANGE,
  GET_ALL_TASKS,
  CREATE_TASK,
  COMPLETE_TASK,
  EDIT_MODE,
  CANCEL_EDIT_MODE,
  IS_LOADED,
} from '../../constants/actionTypes';

const initialState = {
  tasks: [],
  taskEditedMode: { mode: false, taskId: -1 },
  createTaskForm: { title: '', description: '' },
  isLoaded: false,
};

export default (state: any = initialState, action: any) => {
  switch (action.type) {
    case ON_INPUT_CHANGE:
      return {
        ...state,
        createTaskForm: { ...state.createTaskForm, [action.payload.name]: action.payload.value },
      };
    case GET_ALL_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };
    case CREATE_TASK:
      return {
        ...state,
        createTaskForm: { title: '', description: '' },
      };
    case COMPLETE_TASK:
      return state;
    case EDIT_MODE:
      return {
        ...state,
        taskEditedMode: { mode: true, taskId: action.payload._id },
        createTaskForm: { title: action.payload.title, description: action.payload.description },
      };
    case CANCEL_EDIT_MODE:
      return {
        ...state,
        taskEditedMode: { mode: false, taskId: -1 },
        createTaskForm: { title: '', description: '' },
      };
    case IS_LOADED:
      return {
        ...state,
        isLoaded: action.payload,
      };
    default:
      return state;
  }
};
