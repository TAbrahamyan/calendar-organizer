import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { Auth, Home, EmailVerification } from './pages';

interface IRoutesProps {
  isAuth: boolean;
}

const Routes: React.FC<IRoutesProps> = ({ isAuth }) => {
  if (isAuth) {
    return (
      <BrowserRouter>
        <Redirect to="/" />
        <Route path="/" component={Home} />
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Route path="/auth" component={Auth} />
      <Route path="/verify-email=:token" component={EmailVerification} />
      <Redirect to="/auth" />
    </BrowserRouter>
  );
};

export default connect(
  (state: any) => ({ isAuth: state.user.isAuth }),
)(Routes);

