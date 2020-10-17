import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from '../../redux/reducers';
import rootSaga from '../../redux/sagas';

/**
 * configures redux-store depending on environment
 */
export default function configureStore(history) {
  const sagaMiddleware = createSagaMiddleware();

  const store =
    process.env.NODE_ENV === 'production'
      ? configureProductionStore(sagaMiddleware, history)
      : configureDevStore(sagaMiddleware, history);

  sagaMiddleware.run(rootSaga);

  return store;
}

/**
 * Production store configuration
 */
const configureProductionStore = (sagaMiddleware, history) => {
  console.log('configure production store');

  return createStore(
    rootReducer(history),
    applyMiddleware(sagaMiddleware, routerMiddleware(history)),
  );
};

/**
 * Development store configuration
 */
const configureDevStore = (sagaMiddleware, history) => {
  console.log('configure dev store');

  const logger = createLogger({
    collapsed: true,
    diff: true,
    duration: true,
    timestamp: true,
  });

  return createStore(
    rootReducer(history),
    composeWithDevTools(
      applyMiddleware(sagaMiddleware, logger, routerMiddleware(history)),
    ),
  );
};
