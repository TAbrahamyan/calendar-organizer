import axios from 'axios';

export default {
  create: (bodyData: any, headers: any) =>
    axios.post('http://localhost:8000/api/task/create', bodyData, { headers }),
  getAll: (headers: any) => axios.get('http://localhost:8000/api/task/getAll', { headers }),
  delete: (taskId: string) => axios.delete(`http://localhost:8000/api/task/${taskId}`),
  edit: (bodyData: any, taskId: string) => axios.patch(`http://localhost:8000/api/task/edit/${taskId}`, bodyData),
  complete: (bodyData: any, taskId: string) =>
    axios.patch(`http://localhost:8000/api/task/complete/${taskId}`, bodyData),
};
