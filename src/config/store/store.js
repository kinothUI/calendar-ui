import createHistory from 'history/createBrowserHistory';
import configureStore from 'config/store/configure-store';

export const history = createHistory();

const persistStore = configureStore(history);

export const { persistor } = persistStore;

export default persistStore.store;
