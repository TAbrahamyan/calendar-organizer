import taskApi from '../../api/task';
import { GET_ALL_TASKS, CREATE_TASK } from '../../constants/actionTypes';

const fetchTasks = () => (dispatch: any): void => {
  taskApi
    .getAll({ token: localStorage.getItem('token') })
    .then(({ data }) => dispatch({ type: GET_ALL_TASKS, payload: { tasks: data.tasks } }))
    .catch(({ response }) => console.log('Err:', response));
};

export const fetchCreateTask = (bodyData: any) => (dispatch: any): void => {
  const newTask = {
    title: bodyData.title,
    description: bodyData.description,
    createdDay: bodyData.selectedDay,
    completed: false,
  };

  taskApi
    .create(newTask, { token: localStorage.getItem('token') })
    .then(() => {
      dispatch({ type: CREATE_TASK });
      fetchTasks()(dispatch);
      // dispatch(fetchTasks());
    })
    .catch(({ response }) => console.log('Err:', response));
};

export const fetchDeleteTask = (taskId: string) => (dispatch: any) => {
  taskApi
    .delete(taskId)
    .then(() => fetchTasks()(dispatch))
    .catch(({ response }) => console.log('Err:', response));
}

export default {
  fetchTasks,
};
