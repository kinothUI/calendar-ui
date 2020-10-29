import _ from 'lodash';
import { REQUEST, SUCCESS_FETCH, SUCCESS_DELETE, NOT_MODIFIED, FAILURE } from 'redux/actions';
import HttpStatus from 'http-status-codes';

function processReducers(state, action, reducerActions) {
  console.log('%c process reducer', 'color: purple;', state, action, reducerActions);

  switch (action.type) {
    case reducerActions.REQUEST:
      return _.assign({}, state, { isFetching: true, error: undefined });

    case reducerActions.SUCCESS_FETCH:
      if (action.response.status === HttpStatus.NO_CONTENT)
        return _.assign({}, state, { isFetching: false });
      else
        return _.assign({}, state, {
          isFetching: false,
          content: action.response,
          error: undefined,
        });

    case reducerActions.SUCCESS_DELETE:
      const content = state.content.slice(0, state.content.length);
      const indexOfId = content.findIndex((item) => item.id === action.id);

      if (indexOfId !== -1) content.splice(indexOfId, 1);

      return _.assign({}, state, { isFetching: false, content });

    case reducerActions.NOT_MODIFIED:
      return _.assign({}, state, { isFetching: false });

    case reducerActions.FAILURE:
      return _.assign({}, state, { isFetching: false, error: action.error });

    default:
      return state;
  }
}

export const EntityDescriptions = {
  ACCOUNT: 'ACCOUNT',
  TEAM: 'TEAM',
  ROOM: 'ROOM',
};

/**
 * creates reducers for all entities defined in {@link entities}
 */
export default function createReducers() {
  const reducers = {};

  _.forEach(EntityDescriptions, (entity) => {
    reducers[entity.toLowerCase()] = createReducer(entity);
  });

  return reducers;
}

/**
 * Creates a Reducer State Object for each Entity given.
 * @param {String} name EntityDescription
 */
function createReducer(name) {
  const InitialState = {
    content: undefined,
    isFetching: false,
    error: undefined,
  };
  return (state = InitialState, action) => {
    const actions = {
      REQUEST: `${name}_${REQUEST}`,
      SUCCESS_FETCH: `${name}_${SUCCESS_FETCH}`,
      SUCCESS_DELETE: `${name}_${SUCCESS_DELETE}`,
      NOT_MODIFIED: `${name}_${NOT_MODIFIED}`,
      FAILURE: `${name}_${FAILURE}`,
    };

    switch (action.type) {
      case actions.REQUEST:
        return processReducers(state, action, actions);
      case actions.SUCCESS_FETCH:
        return processReducers(state, action, actions);
      case actions.SUCCESS_DELETE:
        return processReducers(state, action, actions);
      case actions.NOT_MODIFIED:
        return processReducers(state, action, actions);
      case actions.FAILURE:
        return processReducers(state, action, actions);
      default:
        return state;
    }
  };
}
