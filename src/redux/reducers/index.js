import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

import ownAccountReducer from 'redux/reducers/ownAccount';
import calendarReducer from 'redux/reducers/calendar';

const rootReducer = (history) =>
  combineReducers({
    ownAccount: ownAccountReducer,
    calendar: calendarReducer,
    router: connectRouter(history),
  });

export default rootReducer;
