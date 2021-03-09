import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { Input } from 'antd';
import { fetchUserLogin, fetchUserSignup } from '../../utils/store/actions/user';
import { notification } from '../../utils/helpers/notification';

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

export default () => {
  const dispatch = useDispatch();
  const [ isShowLoginForm, setIsShowLoginForm ] = React.useState<boolean>(true);
  const { control, errors, formState, reset, handleSubmit } = useForm<IFormData>({
    mode: 'onChange',
  });

  const loginHandler = (formData: any): void => {
    dispatch(fetchUserLogin(formData));
  };

  const signupHandler = (formData: any): void => {
    if (formData.password !== formData.confirmPassword) {
      return notification({ type: 'error', msg: 'Password confirmation is incorrect' });
    }

    dispatch(fetchUserSignup(formData));
    notification({ type: 'success', msg: 'Successful registration' });
    setIsShowLoginForm(true);
    reset();
  };

  const isShowLoginFormHandler = (bool: boolean): void => {
    setIsShowLoginForm(bool);
    reset();
  };

  return (
    <section className="form-fields">
      <div className="form-fields__content">
        <div className="header">
          <span onClick={() => isShowLoginFormHandler(true)} className={isShowLoginForm ? 'active' : undefined}>Login</span>
          <span onClick={() => isShowLoginFormHandler(false)} className={isShowLoginForm ? undefined : 'active'}>Signup</span>
        </div>

        <form onSubmit={handleSubmit(isShowLoginForm ? loginHandler : signupHandler)}>
          <Controller
            control={control}
            rules={RULES.email}
            name="email"
            render={({ onChange, value }) => (
              <Input placeholder="Email" value={value} onChange={onChange} />
            )}
          />
          {errors.email && <span className="error">Invalid email</span>}

          {!isShowLoginForm && (
            <>
              <Controller
                control={control}
                name="fullName"
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
            rules={RULES.password}
            render={({ onChange, value }) => (
              <Input placeholder="Password" type="password" value={value} onChange={onChange} />
            )}
          />
          {errors.password && <span className="error">Password minimum length is 3</span>}

          {!isShowLoginForm && (
            <>
              <Controller
                control={control}
                name="confirmPassword"
                rules={RULES.password}
                render={({ onChange, value }) => (
                  <Input placeholder="Confirm password" type="password" value={value} onChange={onChange} />
                )}
              />
              {errors.confirmPassword && <span className="error">Confirm password minimum length is 3</span>}
            </>
          )}

          <button disabled={!formState.isValid}>
            {isShowLoginForm ? 'Login' : 'Signup'}
          </button>
        </form>
      </div>
    </section>
  );
};
