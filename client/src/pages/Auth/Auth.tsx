import React from 'react';

import { AuthForm, Background, Welcome } from '../../components/Auth';

const Auth: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Login';
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
