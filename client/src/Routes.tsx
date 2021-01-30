import { BrowserRouter, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';

export const Routes = () => {
  return (
    <BrowserRouter>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
    </BrowserRouter>
  );
};