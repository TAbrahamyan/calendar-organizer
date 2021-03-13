import { GET_ME } from '../../constants/actionTypes';
import { notification } from '../../helpers/notification';
import userApi from '../../api/user';
import history from '../../history';

interface IFetchUserLoginSignupFormData {
  email: string;
  fullName: string;
  password: string;
  confirmPassword: string;
}

interface IFetchChangePasswordFormData {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export const fetchUserLogin = (formData: IFetchUserLoginSignupFormData) => (): void => {
  userApi
    .login(formData)
    .then(({ data }) => {
      localStorage.setItem('token', data);
      (history as any).go('/');
    })
    .catch(({ response: { data } }) => notification({ type: 'error', msg: data.msg }));
};

export const fetchUserSignup = (formData: IFetchUserLoginSignupFormData) => (): void => {
  userApi
    .signup(formData)
    .then(() => window.location.reload())
    .catch(({ response: { data } }) => data.msg && notification({ type: 'error', msg: data.msg }));
};

export const fetchUserData = () => (dispatch: any): void => {
  userApi
    .getMe()
    .then(({ data }) => dispatch({ type: GET_ME, payload: data }))
    .catch(({ response }) => (response.status === 500 && fetchUserLogout()));
};

export const fetchChangePassword = (formData: IFetchChangePasswordFormData, id: string) => (): void => {
  userApi
    .changePassword(formData, id)
    .then(({ data }) => notification({ type: 'success', msg: data.msg }))
    .catch(({ response: { data } }) => data.msg && notification({ type: 'error', msg: data.msg }));
};

export const fetchDestroyAccount = (id: string) => (): void => {
  userApi
    .destroyAccount(id)
    .then(() => fetchUserLogout());
};

export const fetchUserLogout = (): void => {
  localStorage.removeItem('token');
  (history as any).go('/auth');
};
