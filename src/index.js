import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { store, history } from 'config/store/store';

import App from 'App';

import 'config/i18next';
import './index.css';
import 'semantic-ui-css/semantic.min.css';

const app = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);
const root = document.getElementById('root');

ReactDOM.render(app, root);
