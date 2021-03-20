import axios from '../axios';

export const userApi = {
  signup: (bodyData: any) => axios.post('/api/user/signup', bodyData),
  login: (bodyData: any) => axios.post('/api/user/login', bodyData),
  loginWithGoogle: (bodyData: any) => axios.post('/api/user/login-with-google', bodyData),
  loginWithFacebook: (bodyData: any) => axios.post('/api/user/login-with-facebook', bodyData),
  getMe: () => axios.get('/api/user/me'),
  emailVerify: (token: string | null) => axios.get(`/api/user/verify-email=${token}`),
  changePassword: (bodyData: any) => axios.patch('/api/user/change-password', bodyData),
  resetPassword: (email: string) => axios.patch('/api/user/reset-password', { email }),
  changeUserPicture: (newPicture: any) => axios.put('/api/user/change-user-picture', { newPicture }),
  deleteUserPicture: () => axios.delete('/api/user/delete-user-picture'),
  destroyAccount: () => axios.delete('/api/user/destroy-account'),
};
