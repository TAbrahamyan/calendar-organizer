import axios from 'axios';

export default {
  create: (bodyData: any, headers: any) => axios.post('http://localhost:8000/api/task/create', bodyData, { headers }),
  getAll: (headers: any) => axios.get('http://localhost:8000/api/task/getAll', { headers }),
  edit: (bodyData: any, taskId: any) => axios.patch(`http://localhost:8000/api/task/${taskId}`, bodyData),
  delete: (taskId: any) => axios.delete(`http://localhost:8000/api/task/${taskId}`),
};
