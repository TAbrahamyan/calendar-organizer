import { GET_ME } from '../../constants/actionTypes';
import userApi from '../../api/user';
import history from '../../history';
import { notification } from '../../helpers/notification';

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

export const fetchDestroyAccount = (id: string) => (): void => {
  userApi.destroyAccount(id)
    .then(() => fetchUserLogout());
};

export const fetchUserLogout = (): void => {
  localStorage.removeItem('token');
  (history as any).go('/auth');
};
