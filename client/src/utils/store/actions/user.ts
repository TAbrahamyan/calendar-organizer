import { GET_ME, VERIFICATION_MODAL } from '../../constants/actionTypes';
import { notification } from '../../helpers/notification';
import { userApi } from '../../api/user';
import history from '../../history';

const login = (data: any): void => {
  localStorage.setItem('token', data);
  (history as any).go('/');
};

export const fetchUserSignup = (formData: IFetchUserLoginSignupFormData) => (dispatch: any): void => {
  userApi
    .signup(formData)
    .then(() => dispatch({ type: VERIFICATION_MODAL, payload: true }))
    .catch(({ response: { data } }) => data.msg && notification({ type: 'error', msg: data.msg }));
};

export const fetchUserLogin = (formData: IFetchUserLoginSignupFormData) => (): void => {
  userApi
    .login(formData)
    .then(({ data }) => login(data))
    .catch(({ response: { data } }) => notification({ type: 'error', msg: data.msg }));
};

export const fetchLoginWithGoogle = (response: IFetchLoginWithGoogleResponse) => () => {
  userApi
    .loginWithGoogle(response)
    .then(({ data }) => login(data))
    .catch(({ response: { data } }) => notification({ type: 'error', msg: data.msg }));
};

export const fetchLoginWithFacebook = (response: IFetchLoginWithFacebookResponse) => () => {
  userApi
    .loginWithFacebook(response)
    .then(({ data }) => login(data))
    .catch(({ response: { data } }) => notification({ type: 'error', msg: data.msg }));
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

export const fetchChangePassword = (formData: IFetchChangePasswordFormData) => (): void => {
  userApi
    .changePassword(formData)
    .then(({ data }) => notification({ type: 'success', msg: data.msg }))
    .catch(({ response: { data } }) => data.msg && notification({ type: 'error', msg: data.msg }));
};

export const fetchResetPassword = (email: string) => (): void => {
  userApi
    .resetPassword(email)
    .then(() => window.location.reload())
    .catch(({ response: { data } }) => data.msg && notification({ type: 'error', msg: data.msg }));
};

export const fetchChangeUserPicture = (picture: any) => (dispatch: any): void => {
  userApi
    .changeUserPicture(picture)
    .then(() => dispatch(fetchUserData()))
    .catch(({ response: { data } }) => data.msg && notification({ type: 'error', msg: data.msg }));
};

export const fetchDeleteUserPicture = () => (dispatch: any): void => {
  userApi
    .deleteUserPicture()
    .then(() => dispatch(fetchUserData()))
    .catch(({ response: { data } }) => data.msg && notification({ type: 'error', msg: data.msg }));
};

export const fetchDestroyAccount = () => (): void => {
  userApi
    .destroyAccount()
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

interface IFetchLoginWithGoogleResponse {
  name: string;
  email: string;
  googleId: string;
  picture: string;
}

interface IFetchLoginWithFacebookResponse {
  name: string;
  email: string;
  facebookUserID: string;
  picture: string;
}
