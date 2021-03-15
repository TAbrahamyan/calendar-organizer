import { GET_ME, VERIFICATION_MODAL } from '../../constants/actionTypes';
import { notification } from '../../helpers/notification';
import userApi from '../../api/user';
import history from '../../history';

export const fetchUserLogin = (formData: IFetchUserLoginSignupFormData) => (): void => {
  userApi
    .login(formData)
    .then(({ data }) => {
      localStorage.setItem('token', data);
      (history as any).go('/');
    })
    .catch(({ response: { data } }) => notification({ type: 'error', msg: data.msg }));
};

export const fetchUserSignup = (formData: IFetchUserLoginSignupFormData) => (dispatch: any): void => {
  userApi
    .signup(formData)
    .then(() => dispatch({ type: VERIFICATION_MODAL, payload: true }))
    .catch(({ response: { data } }) => data.msg && notification({ type: 'error', msg: data.msg }));
};

export const fetchUserData = () => (dispatch: any): void => {
  userApi
    .getMe()
    .then(({ data }) => dispatch({ type: GET_ME, payload: data }))
    .catch(({ response }) => (response.status === 500 && fetchUserLogout()));
};

export const fetchVerifyEmail = (token: string | null) => (): void => {
  userApi.emailVerify(token);
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
