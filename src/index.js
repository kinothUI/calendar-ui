import React from 'react';
import ReactDOM from 'react-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import store, { persistor, history } from 'config/store/store';
import { Dimmer, Loader, Label } from 'semantic-ui-react';

import App from 'App';
import ErrorBoundaryHandler from 'components/error/ErrorBoundaryHandler';

import 'config/i18next';
import 'index.css';
import 'overrides.css';
import 'semantic-ui-css/semantic.min.css';

export const FallBackLoader = (
  <Dimmer active page inverted>
    <Loader size="large">
      <Label circular basic size="large" color="grey">
        Loading App
      </Label>
    </Loader>
  </Dimmer>
);

const app = (
  <ErrorBoundary FallbackComponent={ErrorBoundaryHandler}>
    <Provider store={store}>
      <PersistGate loading={FallBackLoader} persistor={persistor}>
        <ConnectedRouter history={history}>
          <React.Suspense fallback={FallBackLoader}>
            <App />
          </React.Suspense>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  </ErrorBoundary>
);
const root = document.getElementById('root');

ReactDOM.render(app, root);
