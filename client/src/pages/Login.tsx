import React from 'react';
import LoginSignupBackground from '../components/LoginSignupBackground';

export const Login = () => {
  React.useEffect(() => {
    document.title = 'Login';
  }, []);

  return (
    <div>
      <LoginSignupBackground />
    </div>
  );
};
