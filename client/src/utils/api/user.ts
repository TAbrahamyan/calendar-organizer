import axios from '../axios';

export default {
  signup: (bodyData: any) => axios.post('/api/user/signup', bodyData),
  login: (bodyData: any) => axios.post('/api/user/login', bodyData),
  getMe: () => axios.get('/api/user/me'),
};
