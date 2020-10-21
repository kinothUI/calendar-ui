import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

import ownAccountReducer from 'redux/reducers/ownAccount';
import createReducers from 'redux/reducers/entity';
import meetingReducer from './meeting';

const rootReducer = (history) =>
  combineReducers({
    entities: combineReducers(createReducers()),
    ownAccount: ownAccountReducer,
    meeting: meetingReducer,
    router: connectRouter(history),
  });

export default rootReducer;
