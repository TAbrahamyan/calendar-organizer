import { GET_ME } from '../../constants/actionTypes';
import { notification } from '../../helpers/notification';
import userApi from '../../api/user';
import history from '../../history';

export const fetchUserLogin = (formData: any) => (): void => {
  userApi.login(formData)
    .then(({ data }) => {
      localStorage.setItem('token', data);
      (history as any).go('/');
    })
    .catch(({ response: { data } }) => notification({ type: 'error', msg: data.msg }));
};

export const fetchUserSignup = (formData: any) => (): void => {
  userApi.signup(formData)
    .catch(({ response: { data } }) => data.msg && notification({ type: 'error', msg: data.msg }));
};

export const fetchUserData = () => (dispatch: any): void => {
  userApi.getMe()
    .then(({ data }) => dispatch({ type: GET_ME, payload: data }))
    .catch(({ response }) => (response.status === 500 && fetchUserLogout()));
};

export const fetchChangePassword = (formData: any, id: string) => (): void => {
  userApi.changePassword(formData, id)
    .then(({ data }) => notification({ type: 'success', msg: data.msg }))
    .catch(({ response: { data } }) => data.msg && notification({ type: 'error', msg: data.msg }));
};

export const fetchDestroyAccount = (id: string) => (): void => {
  userApi.destroyAccount(id)
    .then(() => fetchUserLogout());
};

export const fetchUserLogout = (): void => {
  localStorage.removeItem('token');
  (history as any).go('/auth');
};
