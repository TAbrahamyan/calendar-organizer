import React from 'react';
import Welcome from '../components/LoginSignup/Welcome';
import LoginFields from '../components/LoginSignup/LoginFields';
import LoginSignupBackground from '../components/LoginSignup/Background';

export const Login: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Login';
  }, []);

  return (
    <>
      <section className="login-signup">
        <Welcome />
        <LoginFields />
      </section>

      <LoginSignupBackground />
    </>
  );
};
