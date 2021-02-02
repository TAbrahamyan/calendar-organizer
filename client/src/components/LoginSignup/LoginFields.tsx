import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, MailOutlined, LockOutlined } from '@ant-design/icons';
import userApi from '../../utils/api/user';

const RULES: any = {
  email: [{ required: true, type: 'email', message: 'Invalid email' }],
  password: [
    { required: true, message: 'Password is required' },
    { min: 3, message: 'Minimum length is 3' },
  ],
};

export default () => {
  const history = useHistory();
  const [ form ] = Form.useForm();
  const [ login, setLogin ] = React.useState({ email: '', password: '' });

  const onChange = ({ target: t }: any) => setLogin({ ...login, [t.name]: t.value });

  const loginHandler = () => {
    userApi.login(login).then(({ data }) => {
      localStorage.setItem('token', data);
      history.push('/');
      window.location.reload();
    }).catch(err => message.error(err.response.data.msg));
  };

  return (
    <section className="form-fields">
      <p>Login</p>

      <Form form={form}>
        <Form.Item name="email" rules={RULES.email}>
          <Input
            name="email"
            placeholder="email"
            value={login.email}
            onChange={onChange}
            prefix={<MailOutlined />}
          />
        </Form.Item>

        <Form.Item name="password" rules={RULES.password}>
          <Input.Password
            name="password"
            placeholder="password"
            value={login.email}
            onChange={onChange}
            prefix={<LockOutlined />}
            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>

        <Form.Item shouldUpdate={true}>
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
