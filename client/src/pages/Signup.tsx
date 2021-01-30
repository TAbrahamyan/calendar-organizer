import React from 'react';
import LoginSignupBackground from '../components/LoginSignupBackground';

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
