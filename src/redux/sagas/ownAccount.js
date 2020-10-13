import { takeLatest, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
  successFetchOwnAccount,
  failureFetchOwnAccount,
  failureLogout,
  successLogout,
  LOGIN,
  LOGOUT,
  FETCH_OWN_ACCOUNT,
  requestOwnAccount,
  PATCH_OWN_ACCOUNT,
  failurePatchAccount,
  successPatchAccount,
  ACCOUNT_PATCH,
} from 'redux/actions/ownAccount';
import {
  fetchAuthenticatedAccount,
  fetchPatchAccount,
  login,
  logout,
} from 'services/ownAccount';

/********************************************************/
/********************** SAGA WORKERS ********************/
/********************************************************/

function* fetchAuthenticatedAccountWorker(action) {
  yield put(requestOwnAccount());
  const { response, error } = yield call(fetchAuthenticatedAccount);

  if (error) yield put(failureFetchOwnAccount(error));
  else yield put(successFetchOwnAccount(response));

  if (action.type === LOGIN) yield put(push('/calendar'));
}

function* patchAccountWorker(action) {
  const { error } = yield call(fetchPatchAccount, action.account);

  if (error) yield put(failurePatchAccount(error));
  else yield put(successPatchAccount(action.account));
}

function* logoutWorker(action) {
  const { response, error } = yield call(logout);

  if (error) {
    yield put(failureLogout(error));
  } else {
    yield put(successLogout(response));
    yield put(push('/login'));
  }
}

function* loginWorker(action) {
  yield put(requestOwnAccount());
  const { error } = yield call(login, action.credentials);

  if (error) yield put(failureFetchOwnAccount(error));
  else yield call(fetchAuthenticatedAccountWorker, action);
}

/********************************************************/
/********************* SAGA WATCHERS ********************/
/********************************************************/

export function* fetchOwnAccountWatcher() {
  yield takeLatest(FETCH_OWN_ACCOUNT, fetchAuthenticatedAccountWorker);
}

export function* patchAccountWatcher() {
  yield takeLatest(ACCOUNT_PATCH, patchAccountWorker);
}

export function* logoutWatcher() {
  yield takeLatest(LOGOUT, logoutWorker);
}

export function* loginWatcher() {
  yield takeLatest(LOGIN, loginWorker);
}
