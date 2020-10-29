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
  failurePatchAccount,
  successPatchAccount,
  ACCOUNT_PATCH,
} from 'redux/actions/ownAccount';
import { fetchAuthenticatedAccount, fetchPatchAccount, login, logout } from 'services/ownAccount';
import { EntityDescriptions } from 'redux/reducers/entity';
import { FETCH } from 'redux/actions';

/********************************************************/
/********************** SAGA WORKERS ********************/
/********************************************************/

// On successfull login:
//  - fetch own Account
//  - fetch Entities:
//      - account
//      - team
//      - room
//  - redirect to /

function* fetchAuthenticatedAccountWorker(action) {
  console.log('fetchAuthenticatedAccountWorker');
  yield put(requestOwnAccount());
  const { response, error } = yield call(fetchAuthenticatedAccount);

  if (error) yield put(failureFetchOwnAccount(error));
  else yield put(successFetchOwnAccount(response));

  if (action.type === LOGIN) {
    const { ACCOUNT, TEAM, ROOM } = EntityDescriptions;

    yield put({ type: `${FETCH}_${ACCOUNT}`, entityDescription: ACCOUNT });
    yield put({ type: `${FETCH}_${TEAM}`, entityDescription: TEAM });
    yield put({ type: `${FETCH}_${ROOM}`, entityDescription: ROOM });
    yield put(push('/'));
  }
}

function* patchOwnAccountWorker(action) {
  const { error } = yield call(fetchPatchAccount, action.account);

  if (error) yield put(failurePatchAccount(error));
  else yield put(successPatchAccount(action.account));
}

function* logoutWorker() {
  const { response, error } = yield call(logout);

  if (error) {
    yield put(failureLogout(error));
  } else {
    yield put(successLogout(response));
    yield put(push('/login'));
  }
}

function* loginWorker(action) {
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

export function* patchOwnAccountWatcher() {
  yield takeLatest(ACCOUNT_PATCH, patchOwnAccountWorker);
}

export function* logoutWatcher() {
  yield takeLatest(LOGOUT, logoutWorker);
}

export function* loginWatcher() {
  yield takeLatest(LOGIN, loginWorker);
}
