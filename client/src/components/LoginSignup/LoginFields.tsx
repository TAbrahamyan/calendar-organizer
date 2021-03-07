import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, MailOutlined, LockOutlined } from '@ant-design/icons';
import { fetchUserLogin } from '../../utils/store/actions/user';

const RULES: any = {
  email: [{ required: true, type: 'email', message: 'Invalid email' }],
  password: [
    { required: true, message: 'Password is required' },
    { min: 3, message: 'Minimum length is 3' },
  ],
};

export default () => {
  const dispatch = useDispatch();
  const [ form ] = Form.useForm();
  const [ loginForm, setLoginForm ] = React.useState({ email: '', password: '' });

  const onChange = ({ target: t }: any) => setLoginForm({ ...loginForm, [t.name]: t.value });

  const loginHandler = (): void => {
    dispatch(fetchUserLogin({ loginForm, message }));
  };

  return (
    <section className="form-fields">
      <p>Login</p>

      <Form form={form}>
        <Form.Item name="email" rules={RULES.email}>
          <Input
            name="email"
            placeholder="email"
            value={loginForm.email}
            onChange={onChange}
            prefix={<MailOutlined />}
          />
        </Form.Item>

        <Form.Item name="password" rules={RULES.password}>
          <Input.Password
            name="password"
            placeholder="password"
            value={loginForm.email}
            onChange={onChange}
            prefix={<LockOutlined />}
            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>

        <Form.Item shouldUpdate>
          {() => (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                type="primary"
                onClick={loginHandler}
                disabled={
                  !form.isFieldsTouched(true) ||
                  !!form.getFieldsError().filter(({ errors }) => errors.length).length
                }
              >
                Login
              </Button>
              <span className="forgot" style={{ marginTop: '6px' }}>Forgot password?</span>
            </div>
          )}
        </Form.Item>
      </Form>

      <NavLink to="/signup" className="go" style={{ marginTop: '-1rem' }}>Go to signup</NavLink>
    </section>
  );
};
