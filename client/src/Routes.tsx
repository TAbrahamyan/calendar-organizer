import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Home } from './pages/Home';
import { Auth } from './pages/Auth';

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
  (state: any) => ({ isAuth: state.user.isAuth }),
)(Routes);
