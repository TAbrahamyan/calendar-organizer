import { GET_ME } from '../../constants/actionTypes';
import userApi from '../../api/user';
import history from '../../history';

export const fetchUserLogin = (bodyData: any) => (): void => {
  userApi.login(bodyData.loginForm)
    .then(({ data }) => {
      localStorage.setItem('token', data);
      (history as any).go('/');
    })
    .catch(err => bodyData.message.error(err.response.data.msg));
};

export const fetchUserSignup = (bodyData: any) => (): void => {
  userApi.signup(bodyData.signupForm)
    .then(({ data }) => {
      bodyData.message.success(data.msg);
      (history as any).go('/login');
    })
    .catch(({ response: { data } }) => data.msg && bodyData.message.error(data.msg));
};

export const fetchUserData = () => (dispatch: any): void => {
  userApi.getMe()
    .then(({ data }) => dispatch({ type: GET_ME, payload: data }))
    .catch(({ response }) => (response.status === 500 && fetchUserLogout()));
};

export const fetchUserLogout = (): void => {
  localStorage.removeItem('token');
  (history as any).go('/login');
};
