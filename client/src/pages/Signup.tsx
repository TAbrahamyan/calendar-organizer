import React from 'react';
import Welcome from '../components/LoginSignup/Welcome';
import SignupFields from '../components/LoginSignup/SignupFields';
import LoginSignupBackground from '../components/LoginSignup/Background';

export const Signup: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Signup';
  }, []);

  return (
    <>
      <section className="login-signup">
        <Welcome />
        <SignupFields />
      </section>

      <LoginSignupBackground />
    </>
  );
};
