import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { Input } from 'antd';

import { VerificationModal } from './components';
import { notification } from '../../../utils/helpers/notification';
import { fetchUserLogin, fetchUserSignup } from '../../../utils/store/actions/user';

const RULES = {
  email: { required: true, pattern: /^\S+@\S+\.\S+$/ },
  fullName: { required: true, pattern: /^[A-Za-z ]+$/ },
  password: { required: true, minLength: 3 },
};

interface IFormData {
  email: string;
  fullName: string;
  password: string;
  confirmPassword: string;
}

const AuthForm: React.FC = () => {
  const dispatch = useDispatch();
  const [ isLogin, setIsLogin ] = React.useState<boolean>(true);
  const { control, errors, formState, reset, handleSubmit } = useForm<IFormData>({
    mode: 'onChange',
  });

  const loginHandler = (formData: IFormData): void => {
    dispatch(fetchUserLogin(formData));
  };

  const signupHandler = (formData: IFormData): void => {
    if (formData.password !== formData.confirmPassword) {
      return notification({ type: 'error', msg: 'Password confirmation is incorrect' });
    }

    dispatch(fetchUserSignup(formData));
  };

  const isLoginHandler = (bool: boolean): void => {
    reset();
    setIsLogin(bool);
  };

  return (
    <section className="form-fields">
      <VerificationModal />

      <div className="header">
        <span onClick={() => isLoginHandler(true)} className={isLogin ? 'active' : undefined}>Login</span>
        <span onClick={() => isLoginHandler(false)} className={isLogin ? undefined : 'active'}>Signup</span>
      </div>

      <form onSubmit={handleSubmit(isLogin ? loginHandler : signupHandler)}>
        <Controller
          control={control}
          rules={RULES.email}
          name="email"
          defaultValue=""
          render={({ onChange, value }) => (
            <Input placeholder="Email" value={value} onChange={onChange} />
          )}
        />
        {errors.email && <span className="error">Invalid email</span>}

        {!isLogin && (
          <>
            <Controller
              control={control}
              name="fullName"
              defaultValue=""
              rules={RULES.fullName}
              render={({ onChange, value }) => (
                <Input placeholder="Full name" value={value} onChange={onChange} />
              )}
            />
            {errors.fullName && <span className="error">Full name must not contain special symbols</span>}
          </>
        )}

        <Controller
          control={control}
          name="password"
          defaultValue=""
          rules={RULES.password}
          render={({ onChange, value }) => (
            <Input placeholder="Password" type="password" value={value} onChange={onChange} />
          )}
        />
        {errors.password && <span className="error">Password minimum length is 3</span>}

        {!isLogin && (
          <>
            <Controller
              control={control}
              name="confirmPassword"
              defaultValue=""
              rules={RULES.password}
              render={({ onChange, value }) => (
                <Input placeholder="Confirm password" type="password" value={value} onChange={onChange} />
              )}
            />
            {errors.confirmPassword && <span className="error">Confirm password minimum length is 3</span>}
          </>
        )}

        <button className="pink-btn" disabled={!formState.isValid}>
          {isLogin ? 'Login' : 'Signup'}
        </button>
      </form>
    </section>
  );
};

export default AuthForm;
