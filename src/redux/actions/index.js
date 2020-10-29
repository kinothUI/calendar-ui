export const FETCH = 'FETCH';
export const CREATE = 'CREATE';
export const UPDATE = 'UPDATE';
export const DELETE = 'DELETE';

export const REQUEST = 'REQUEST';
export const SUCCESS_FETCH = 'SUCCESS_FETCH';
export const SUCCESS_DELETE = 'SUCCESS_DELETE';
export const NOT_MODIFIED = 'NOT_MODIFIED';
export const FAILURE = 'FAILURE';

export const createFetchEntityAction = ({ entityDescription }) =>
  action(`${entityDescription}_${REQUEST}`);

export const createSuccessFetchEntityAction = (response, { entityDescription }) =>
  action(`${entityDescription}_${SUCCESS_FETCH}`, { response });

export const createFailureEntityAction = (error, { entityDescription }) =>
  action(`${entityDescription}_${FAILURE}`, { error });

export const deleteFetchEntityAction = ({ entityDescription }) =>
  action(`${entityDescription}_${DELETE}`);

export const deleteSuccessFetchEntityAction = (entityDescription, id) =>
  action(`${entityDescription}_${SUCCESS_DELETE}`, { entityDescription, id });

export const deleteFailureFetchEntityAction = ({ error, entityDescription }) =>
  action(`${entityDescription}_${FAILURE}`, { error });

/**
 * Helper function to produce the right shape of a reducer action.
 */
export function action(type, payload) {
  return {
    type,
    ...payload,
  };
}
