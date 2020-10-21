import { action } from 'redux/actions';

export const REQUEST_OPEN = 'REQUEST_OPEN';
export const OPEN_SUCCESS = 'OPEN_SUCCESS';
export const CLOSE_REQUEST = 'CLOSE_REQUEST';
export const CLOSE_SUCCESS = 'CLOSE_SUCCESS';

export const REQUEST_SAVE = 'REQUEST_SAVE';
export const SAVE_SUCCESS = 'SAVE_SUCCESS';

export const createNewMeetingSagaAction = ({ type, payload }) =>
  action(type, payload);
