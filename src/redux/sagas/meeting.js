import { takeLatest, put } from 'redux-saga/effects';

import {
  REQUEST_OPEN,
  OPEN_SUCCESS,
  REQUEST_SAVE,
  SAVE_SUCCESS,
} from 'redux/actions/meeting';

/********************************************************/
/********************** SAGA WORKERS ********************/
/********************************************************/

function* createSaveMeetingSagaWorker(action) {
  yield put({ type: SAVE_SUCCESS, meeting: action.meeting });
}

function* createNewMeetingSagaWorker(action) {
  yield put({ type: OPEN_SUCCESS, time: action.time });
}

/********************************************************/
/********************* SAGA WATCHERS ********************/
/********************************************************/

export function* createSaveMeetingSagaWatcher() {
  yield takeLatest(REQUEST_SAVE, createSaveMeetingSagaWorker);
}

export function* createNewMeetingSagaWatcher() {
  yield takeLatest(REQUEST_OPEN, createNewMeetingSagaWorker);
}
