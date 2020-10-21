import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from 'redux/reducers/index';
import rootSaga from 'redux/sagas/index';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['ownAccount', 'entities'],
};

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

  const persistor = persistStore(store);

  return { store, persistor };
}

/**
 * Production store configuration
 */
const configureProductionStore = (sagaMiddleware, history) => {
  console.log('configure production store');

  return createStore(
    persistReducer(persistConfig, rootReducer(history)),
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
    persistReducer(persistConfig, rootReducer(history)),
    composeWithDevTools(
      applyMiddleware(sagaMiddleware, logger, routerMiddleware(history)),
    ),
  );
};
