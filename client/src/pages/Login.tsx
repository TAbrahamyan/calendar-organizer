import React from 'react';
import { NavLink } from 'react-router-dom';
import { Form, Input, Button } from 'antd';

import LoginSignupBackground from '../components/LoginSignup/Background';
import Welcome from '../components/LoginSignup/Welcome';

export const Login = () => {
  React.useEffect(() => {
    document.title = 'Login';
  }, []);

  return (
    <div>
      <div className="login-signup">
        <Welcome />

        <div className="form-fields">
          <p className="login">Login</p>

          <Form>
            <Form.Item name="email" rules={[{ required: true, type: 'email', message: 'Invalid email' }]}>
              <Input placeholder="email" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Password is required' },
                { min: 3, message: 'Minimum length is 3' },
              ]}
            >
              <Input placeholder="password" />
            </Form.Item>
          </Form>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button type="primary">Login</Button>
            <p className="forgot" style={{ marginTop: '6px' }}>Forgot password?</p>
          </div>

          <NavLink to="/signup" className="go">Go to register</NavLink>
        </div>
      </div>

      <LoginSignupBackground />
    </div>
  );
};
