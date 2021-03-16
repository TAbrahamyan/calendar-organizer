import axios from '../axios';

export default {
  signup: (bodyData: any) => axios.post('/api/user/signup', bodyData),
  login: (bodyData: any) => axios.post('/api/user/login', bodyData),
  loginWithGoogle: (bodyData: any) => axios.post('/api/user/login-with-google', bodyData),
  getMe: () => axios.get('/api/user/me'),
  emailVerify: (token: string | null) => axios.get(`/api/user/verify-email=${token}`),
  changePassword: (bodyData: any, id: string) => axios.patch(`/api/user/${id}`, bodyData),
  destroyAccount: (id: string) => axios.delete(`/api/user/${id}`),
};
