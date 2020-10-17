import { all, call, takeLatest, put } from 'redux-saga/effects';
import {
  loginWatcher,
  logoutWatcher,
  fetchOwnAccountWatcher,
  patchOwnAccountWatcher,
} from 'redux/sagas/ownAccount';

import {
  FETCH,
  CREATE,
  UPDATE,
  DELETE,
  // REQUEST,
  createFetchEntityAction,
  createSuccessFetchEntityAction,
  // createSuccessDeleteEntityAction,
  createFailureEntityAction,
} from 'redux/actions';
import { EntityDescriptions } from 'redux/reducers/entity';
import { fetchAllByEntity } from 'services/entity';

export default function* rootSaga() {
  yield all(combineWatchers());
}

/************************************************************************************************/
/****************************************** SAGA WORKERS ****************************************/
/************************************************************************************************/

function* deleteByEntityWoker(entityDescription) {
  yield console.log(
    'entityDescription in createEntityWorker',
    entityDescription,
  );
}

function* updateByEntityWorker(entityDescription) {
  yield console.log(
    'entityDescription in createEntityWorker',
    entityDescription,
  );
}

function* createByEntityWorker(entityDescription) {
  yield console.log(
    'entityDescription in createEntityWorker',
    entityDescription,
  );
}

function* fetchByEntityWorker(entityDescription) {
  yield put(createFetchEntityAction(entityDescription));

  const { response, error } = yield call(fetchAllByEntity, entityDescription);

  if (error) yield put(createFailureEntityAction(error, entityDescription));
  else yield put(createSuccessFetchEntityAction(response, entityDescription));
}

/************************************************************************************************/
/***************************************** SAGA WATCHERS ****************************************/
/************************************************************************************************/

function* deleteByEntityWatcher(entityDescription) {
  yield takeLatest(`${DELETE}_${entityDescription}`, deleteByEntityWoker);
}

function* updateByEntityWatcher(entityDescription) {
  yield takeLatest(`${UPDATE}_${entityDescription}`, updateByEntityWorker);
}

function* createByEntityWatcher(entityDescription) {
  yield takeLatest(`${CREATE}_${entityDescription}`, createByEntityWorker);
}

function* fetchByEntityWatcher(entityDescription) {
  yield takeLatest(`${FETCH}_${entityDescription}`, fetchByEntityWorker);
}

/**
 * Combine all Watchers into a single Array
 */
function combineWatchers() {
  const watchers = [];

  Object.keys(EntityDescriptions).forEach((entity) => {
    watchers.push(call(fetchByEntityWatcher, entity));
    watchers.push(call(createByEntityWatcher, entity));
    watchers.push(call(updateByEntityWatcher, entity));
    watchers.push(call(deleteByEntityWatcher, entity));
  });

  watchers.push(call(loginWatcher));
  watchers.push(call(logoutWatcher));
  watchers.push(call(fetchOwnAccountWatcher));
  watchers.push(call(patchOwnAccountWatcher));

  return watchers;
}
