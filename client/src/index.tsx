import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { Router } from 'react-router-dom';

import Routes from './Routes';
import history from './utils/history';
import store from './utils/store/store';

import 'antd/dist/antd.css';
import './scss/app.scss';

ReactDOM.render(
  <ReduxProvider store={store}>
    <Router history={history}>
      <Routes />
    </Router>
  </ReduxProvider>,
  document.getElementById('root'),
);
