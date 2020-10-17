import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

import ownAccountReducer from 'redux/reducers/ownAccount';
import calendarReducer from 'redux/reducers/calendar';
import createReducers from 'redux/reducers/entity';

const rootReducer = (history) =>
  combineReducers({
    entities: combineReducers(createReducers()),
    ownAccount: ownAccountReducer,
    calendar: calendarReducer,
    router: connectRouter(history),
  });

export default rootReducer;
