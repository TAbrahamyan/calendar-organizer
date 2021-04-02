import { taskApi } from '../../api/task';
import { ITasks } from '../../types';
import {
  GET_ALL_TASKS,
  CREATE_TASK,
  EDIT_MODE,
  CANCEL_EDIT_MODE,
  COMPLETE_TASK,
  IS_LOADED,
  ON_INPUT_CHANGE,
} from '../../constants/actionTypes';

export const fetchTasks = () => (dispatch: any): void => {
  dispatch({ type: IS_LOADED, payload: false });

  taskApi
    .getAll()
    .then(({ data }) => dispatch({ type: GET_ALL_TASKS, payload: data.tasks }))
    .catch(({ response }) => new Error(response))
    .finally(() => dispatch({ type: IS_LOADED, payload: true }));
};

export const fetchCreateTask = (bodyData: IFetchCreateTaskBodyData) => (dispatch: any): void => {
  const newTask = {
    title: bodyData.title,
    description: bodyData.description,
    createdMonth: bodyData.selectedMonth,
    createdDay: bodyData.selectedDay,
  };

  taskApi
    .create(newTask)
    .then(() => {
      dispatch({ type: CREATE_TASK });
      dispatch(fetchTasks());
    });
};

export const fetchEditTask = (bodyData: IFetchEditTaskBodyData) => (dispatch: any): void => {
  const { title, description, taskId } = bodyData;

  taskApi
    .edit({ title, description }, taskId)
    .then(() => {
      dispatch({ type: CANCEL_EDIT_MODE });
      dispatch(fetchTasks());
    });
};

export const fetchCompleteTask = (bodyData: IFetchfetchCompleteTaskBodyData) => (dispatch: any): void => {
  taskApi
    .complete({ completed: bodyData.completed }, bodyData.id)
    .then(() => {
      dispatch({ type: COMPLETE_TASK });
      dispatch(fetchTasks());
    });
};

export const fetchDeleteTask = (id: string) => (dispatch: any): void => {
  taskApi
    .delete(id)
    .then(() => dispatch(fetchTasks()));
};

export const setEditTask = (task: ITasks) => ({
  type: EDIT_MODE,
  payload: task,
});

export const setInputValues = (payload: { value: string, name: string }) => ({
  type: ON_INPUT_CHANGE,
  payload,
});

export const setCancelEditMode = () => ({
  type: CANCEL_EDIT_MODE,
});

interface IFetchCreateTaskBodyData {
  title: string;
  description: string;
  selectedMonth: string;
  selectedDay: string;
}

interface IFetchEditTaskBodyData {
  title: string;
  description: string;
  taskId: string;
}

interface IFetchfetchCompleteTaskBodyData {
  id: string;
  completed: boolean;
}
