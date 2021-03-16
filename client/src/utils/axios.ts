import Axios from 'axios';
import { fetchUserLogout } from './store/actions/user';

const axios = Axios.create({
  baseURL: window.location.origin.includes('localhost') ? 'http://localhost:8000' : window.location.origin,
});

axios.interceptors.request.use((config) => {
  try {
    config.headers.token = localStorage.getItem('token');
    return config;
  } catch (err) {
    return config;
  }
});

axios.interceptors.response.use(
  (response) => response,
  (err) => {
    if (err.response && err.response.status === 401) {
      fetchUserLogout();
    }

    return Promise.reject(err);
  },
);

export default axios;
