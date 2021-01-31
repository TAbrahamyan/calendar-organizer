import React from 'react';
import { NavLink } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const RULES: any = {
  email: [{ required: true, type: 'email', message: 'Invalid email' }],
  fullName: [
    { required: true,  message: 'Full name is required' },
    { pattern: /^[A-Za-z ]+$/g, message: 'Full name must not contain special symbols' },
  ],
  password: [
    { required: true, message: 'Password confirmation is required' },
    { min: 3, message: 'Minimum length is 3' },
  ],
};

export default () => {
  return (
    <section className="form-fields">
      <p>Signup</p>

      <Form>
        <Form.Item name="email" rules={RULES.email}>
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item name="fullName" rules={RULES.fullName}>
          <Input placeholder="Full name" />
        </Form.Item>

        <div style={{ display: 'flex' }}>
          <Form.Item name="password" rules={RULES.password} style={{ marginRight: '0.3rem' }}>
            <Input.Password placeholder="Password" iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
          </Form.Item>

          <Form.Item name="confirmPassword" rules={RULES.password} style={{ marginLeft: '0.3rem' }}>
            <Input.Password placeholder="Confirm password" iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
          </Form.Item>
        </div>
      </Form>

      <Button type="primary">Signup</Button>
      <NavLink to="/login" className="go">Go to login</NavLink>
    </section>
  );
};
