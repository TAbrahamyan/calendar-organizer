import axios from '../axios';

export const taskApi = {
  getAll: () => axios.get('/api/task/getAll'),
  create: (bodyData: any) => axios.post('/api/task/create', bodyData),
  delete: (id: string) => axios.delete(`/api/task/${id}`),
  edit: (bodyData: any, id: string) => axios.patch(`/api/task/edit/${id}`, bodyData),
  complete: (bodyData: any, id: string) => axios.patch(`/api/task/complete/${id}`, bodyData),
};
