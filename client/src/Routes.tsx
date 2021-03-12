import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Auth, Home } from './pages';

interface IRoutesProps {
  isAuth: boolean;
}

const Routes = ({ isAuth }: IRoutesProps) => {
  return (
    <BrowserRouter>
      <Route path={isAuth ? '/' : '/auth'} component={isAuth ? Home : Auth} />
      <Redirect to={isAuth ? '/' : '/auth'} />
    </BrowserRouter>
  );
};

export default connect(
  ({ user }: any) => ({ isAuth: user.isAuth }),
)(Routes);
