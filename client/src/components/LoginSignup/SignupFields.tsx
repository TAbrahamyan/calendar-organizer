import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { fetchUserSignup } from '../../utils/store/actions/user';

const RULES: any = {
  email: [{ required: true, type: 'email', message: 'Invalid email' }],
  password: [{ required: true, min: 3, message: 'Minimum length is 3' }],
  fullName: [
    { required: true,  message: 'Full name is required' },
    { pattern: /^[A-Za-z ]+$/g, message: 'Full name must not contain special symbols' },
  ],
};

export default () => {
  const dispatch = useDispatch();
  const [ form ] = Form.useForm();
  const [ signupForm, setSignupForm ] = React.useState({ email: '', fullName: '', password: '', confirmPassword: '' });

  const onChange = ({ target: t }: any) => setSignupForm({ ...signupForm, [t.name]: t.value });

  const signupHandler = () => {
    if (signupForm.password !== signupForm.confirmPassword) {
      return message.error('Password confirmation is incorrect');
    }

    dispatch(fetchUserSignup({ signupForm, message }));
  };

  return (
    <section className="form-fields">
      <p>Signup</p>

      <Form form={form}>
        <Form.Item name="email" rules={RULES.email}>
          <Input
            name="email"
            placeholder="Email"
            value={signupForm.email}
            onChange={onChange}
            prefix={<MailOutlined />}
          />
        </Form.Item>

        <Form.Item name="fullName" rules={RULES.fullName}>
          <Input
            name="fullName"
            placeholder="Full name"
            value={signupForm.fullName}
            onChange={onChange}
            prefix={<UserOutlined />}
          />
        </Form.Item>

        <div style={{ display: 'flex' }}>
          <Form.Item name="password" rules={RULES.password} style={{ marginRight: '0.3rem' }}>
            <Input.Password
              name="password"
              placeholder="Password"
              value={signupForm.password}
              onChange={onChange}
              prefix={<LockOutlined />}
              iconRender={(visible: boolean) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>

          <Form.Item name="confirmPassword" rules={RULES.password} style={{ marginLeft: '0.3rem' }}>
            <Input.Password
              name="confirmPassword"
              placeholder="Confirm password"
              value={signupForm.confirmPassword}
              onChange={onChange}
              prefix={<LockOutlined />}
              iconRender={(visible: boolean) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>
        </div>

        <Form.Item shouldUpdate>
          {() => (
            <Button
              type="primary"
              onClick={signupHandler}
              disabled={
                !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length).length
              }
            >
              Signup
            </Button>
          )}
        </Form.Item>
      </Form>

      <NavLink to="/login" className="go" style={{ marginTop: '-1rem' }}>Go to login</NavLink>
    </section>
  );
};
