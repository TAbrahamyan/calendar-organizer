import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';

interface IRoutesProps {
  isAuth: boolean;
}

const Routes = ({ isAuth }: IRoutesProps) => {
  if (isAuth) {
    return (
      <BrowserRouter>
        <Route path="/" component={Home} />
        <Redirect to="/" />
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
      <Redirect to="/login" />
    </BrowserRouter>
  );
};

export default connect(
  (state: any) => ({ isAuth: state.user.isAuth }),
)(Routes);
