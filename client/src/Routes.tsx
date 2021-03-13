import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { Auth, Home } from './pages';

interface IRoutesProps {
  isAuth: boolean;
}

const Routes: React.FC<IRoutesProps> = ({ isAuth }) => {
  return (
    <BrowserRouter>
      <Route path={isAuth ? '/' : '/auth'} component={isAuth ? Home : Auth} />
      <Redirect to={isAuth ? '/' : '/auth'} />
    </BrowserRouter>
  );
};

export default connect(
  (state: any) => ({ isAuth: state.user.isAuth }),
)(Routes);
