import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import Routes from './Routes';
import history from './utils/history';
import store from './utils/store/store';

import 'antd/dist/antd.css';
import './scss/app.scss';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Routes />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
