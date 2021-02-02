import axios from 'axios';

export default {
  signup: (postData: any) => axios.post('http://localhost:8000/api/user/signup', postData),
  login: (postData: any) => axios.post('http://localhost:8000/api/user/login', postData),
  getMe: (headers: any) => axios.get('http://localhost:8000/api/user/me', { headers }),
};
