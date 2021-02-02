import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';

export const Routes = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return (
      <BrowserRouter>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Redirect to="/login" />
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Route path="/" component={Home} />
      <Redirect to="/" />
    </BrowserRouter>
  );
};
