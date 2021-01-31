import React from 'react';
import { NavLink } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const RULES: any = {
  email: [{ required: true, type: 'email', message: 'Invalid email' }],
  password: [
    { required: true, message: 'Password is required' },
    { min: 3, message: 'Minimum length is 3' },
  ],
};

export default () => {
  return (
    <section className="form-fields">
      <p>Login</p>

      <Form>
        <Form.Item name="email" rules={RULES.email}>
          <Input placeholder="email" />
        </Form.Item>

        <Form.Item name="password" rules={RULES.password}>
          <Input.Password placeholder="password" iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
        </Form.Item>
      </Form>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button type="primary">Login</Button>
        <span className="forgot" style={{ marginTop: '6px' }}>Forgot password?</span>
      </div>

      <NavLink to="/signup" className="go">Go to register</NavLink>
    </section>
  );
};
