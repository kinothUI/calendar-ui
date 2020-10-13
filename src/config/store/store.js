import createHistory from 'history/createBrowserHistory';
import configureStore from 'config/store/configure-store';

export const history = createHistory();

export const store = configureStore(history);
