import { all } from 'redux-saga/effects';
import {
  fetchOwnAccountWatcher,
  loginWatcher,
  logoutWatcher,
  patchAccountWatcher,
} from 'redux/sagas/ownAccount';

export default function* rootSaga() {
  yield all([
    loginWatcher(),
    fetchOwnAccountWatcher(),
    logoutWatcher(),
    patchAccountWatcher(),
  ]);
}
