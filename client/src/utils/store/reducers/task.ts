import {
  ON_INPUT_CHANGE,
  CREATE_TASK,
  REMOVE_TASK,
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
    case CREATE_TASK:
      const newTask = {
        id: Date.now(),
        title: state.createTaskForm.title,
        description: state.createTaskForm.description,
        createdDay: action.payload.selectedDay,
        completed: false,
      };

      return {
        ...state,
        createTaskForm: { title: '', description: '' },
        tasks: [ newTask, ...state.tasks ],
      };
    case REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task: any) => task.id !== action.payload.taskId),
      };
    case COMPLETE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task: any) => {
          if (task.id === action.payload.taskId) {
            task.completed = !task.completed;
          }

          return task;
        }),
      };
    case EDIT_MODE:
      return {
        ...state,
        taskEditedMode: { mode: true, taskId: action.payload.task.id },
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
          if (task.id === state.taskEditedMode.taskId) {
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
