import React from 'react';
import { AuthForm, Background, Welcome } from '../../components/Auth';

const Auth: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Auth';
  }, []);

  return (
    <>
      <section className="auth">
        <Welcome />
        <AuthForm />
      </section>

      <Background />
    </>
  );
};

export default Auth;
