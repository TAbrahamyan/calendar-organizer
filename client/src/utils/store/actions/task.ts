import taskApi from '../../api/task';
import {
  GET_ALL_TASKS,
  CREATE_TASK,
  EDIT_MODE,
  CANCEL_EDIT_MODE,
  COMPLETE_TASK,
  IS_LOADED,
} from '../../constants/actionTypes';

export const fetchTasks = () => (dispatch: any): void => {
  dispatch({ type: IS_LOADED, payload: false });

  taskApi
    .getAll({ token: localStorage.getItem('token') })
    .then(({ data }) => dispatch({ type: GET_ALL_TASKS, payload: data.tasks }))
    .catch(({ response }) => new Error(response))
    .finally(() => dispatch({ type: IS_LOADED, payload: true }));
};

export const fetchCreateTask = (bodyData: any) => (dispatch: any): void => {
  const newTask = {
    title: bodyData.title,
    description: bodyData.description,
    createdDay: bodyData.selectedDay,
  };

  taskApi
    .create(newTask, { token: localStorage.getItem('token') })
    .then(() => {
      dispatch({ type: CREATE_TASK });
      dispatch(fetchTasks());
    });
};

export const fetchEditTask = (bodyData: any) => (dispatch: any) => {
  const fetchEditedData = { newTitle: bodyData.title, newDescription: bodyData.description };

  taskApi
    .edit(fetchEditedData, bodyData.taskId)
    .then(() => {
      dispatch({ type: CANCEL_EDIT_MODE });
      dispatch(fetchTasks());
    });
};

export const fetchCompleteTask = (bodyData: any) => (dispatch: any) => {
  taskApi
    .complete({ completed: bodyData.completed }, bodyData.id)
    .then(() => {
      dispatch({ type: COMPLETE_TASK });
      dispatch(fetchTasks());
    });
};

export const fetchDeleteTask = (id: string) => (dispatch: any) => {
  taskApi.delete(id).then(() => dispatch(fetchTasks()));
};

export const setEditTask = (task: any) => ({
  type: EDIT_MODE,
  payload: task,
});

export const setCancelEditMode = () => ({
  type: CANCEL_EDIT_MODE,
});
