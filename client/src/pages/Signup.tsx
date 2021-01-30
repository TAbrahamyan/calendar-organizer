import React from 'react';
import LoginSignupBackground from '../components/LoginSignup/Background';

export const Signup = () => {
  React.useEffect(() => {
    document.title = 'Signup';
  }, []);

  return (
    <div>
      <LoginSignupBackground />
    </div>
  );
};
