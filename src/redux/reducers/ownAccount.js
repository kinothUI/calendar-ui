import _ from 'lodash';
import {
  FAILURE_FETCH_OWN_ACCOUNT,
  REQUEST_OWN_ACCOUNT,
  SUCCESS_FETCH_OWN_ACCOUNT,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  ACCOUNT_PATCH,
  ACCOUNT_PATCH_SUCCESS,
  ACCOUNT_PATCH_FAILURE,
} from 'redux/actions/ownAccount';
import HttpStatus from 'http-status-codes';

const InitialState = {
  isFetching: false,
};

function ownAccountReducer(state = InitialState, action) {
  switch (action.type) {
    case REQUEST_OWN_ACCOUNT:
      return _.assign({}, state, { isFetching: true });

    case SUCCESS_FETCH_OWN_ACCOUNT:
      // not logged in
      if (action.response.status === HttpStatus.NO_CONTENT)
        return _.assign({}, state, { isFetching: false });
      // logged in
      else return _.assign({}, state, { isFetching: false, content: action.response });

    case FAILURE_FETCH_OWN_ACCOUNT:
      return _.assign({}, state, { isFetching: false, error: action.error });

    case LOGOUT:
      return _.assign({}, state, { isFetching: true });

    case LOGOUT_SUCCESS:
      return _.assign({}, state, { isFetching: false, content: undefined });

    case LOGOUT_FAILURE:
      return _.assign({}, state, { isFetching: false, error: action.error });

    case ACCOUNT_PATCH:
      return _.assign({}, state, { isFetching: true });

    case ACCOUNT_PATCH_SUCCESS:
      return _.assign({}, state, { isFetching: false, content: action.account });
    case ACCOUNT_PATCH_FAILURE:
      return _.assign({}, state, { error: action.error });
    default:
      return state;
  }
}

export default ownAccountReducer;
