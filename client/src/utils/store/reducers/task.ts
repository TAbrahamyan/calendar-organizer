import {
  ON_INPUT_CHANGE,
  GET_ALL_TASKS,
  CREATE_TASK,
  COMPLETE_TASK,
  EDIT_MODE,
  SAVE_EDITED_TASK,
  CANCEL_EDIT_MODE,
} from '../../constants/actionTypes';

const initialState = {
  tasks: [],
  taskEditedMode: { mode: false, taskId: -1 },
  createTaskForm: { title: '', description: '' },
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
        tasks: action.payload.tasks,
      };
    case CREATE_TASK:
      return {
        ...state,
        createTaskForm: { title: '', description: '' },
      };
    case COMPLETE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task: any) => {
          if (task._id === action.payload.taskId) {
            task.completed = !task.completed;
          }

          return task;
        }),
      };
    case EDIT_MODE:
      return {
        ...state,
        taskEditedMode: { mode: true, taskId: action.payload.task._id },
        createTaskForm: { title: action.payload.task.title, description: action.payload.task.description },
      };
    case CANCEL_EDIT_MODE:
      return {
        ...state,
        taskEditedMode: { mode: false, taskId: -1 },
        createTaskForm: { title: '', description: '' },
      };
    case SAVE_EDITED_TASK:
      return {
        taskEditedMode: { mode: false, taskId: -1 },
        createTaskForm: { title: '', description: '' },
        tasks: state.tasks.map((task: any) => {
          if (task._id === state.taskEditedMode.taskId) {
            task.title = state.createTaskForm.title;
            task.description = state.createTaskForm.description;
          }

          return task;
        }),
      };
    default:
      return state;
  }
};
