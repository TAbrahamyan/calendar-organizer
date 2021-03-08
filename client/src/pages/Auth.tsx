import React from 'react';
import Welcome from '../components/Auth/Welcome';
import AuthForm from '../components/Auth/AuthForm';
import LoginSignupBackground from '../components/Auth/Background';

export const Auth: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Login';
  }, []);

  return (
    <>
      <section className="auth">
        <Welcome />
        <AuthForm />
      </section>

      <LoginSignupBackground />
    </>
  );
};
