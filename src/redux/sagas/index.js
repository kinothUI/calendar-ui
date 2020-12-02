import { all, call, takeLatest, put } from 'redux-saga/effects';
import {
  loginWatcher,
  logoutWatcher,
  fetchOwnAccountWatcher,
  patchOwnAccountWatcher,
} from 'redux/sagas/ownAccount';
import { createNewMeetingSagaWatcher, createSaveMeetingSagaWatcher } from 'redux/sagas/meeting';
import {
  FETCH,
  CREATE,
  UPDATE,
  DELETE,
  createFetchEntityAction,
  createSuccessFetchEntityAction,
  createFailureEntityAction,
  deleteFetchEntityAction,
  deleteSuccessFetchEntityAction,
  deleteFailureFetchEntityAction,
} from 'redux/actions';
import { EntityDescriptions } from 'redux/reducers/entity';
import { fetchAllByEntity, createEntity, deleteEntityById, patchEntity } from 'services/entity';

export default function* rootSaga() {
  yield all(combineWatchers());
}

/************************************************************************************************/
/****************************************** SAGA WORKERS ****************************************/
/************************************************************************************************/

function* deleteByEntityWoker(action) {
  console.log('action in createEntityWorker', action);
  const { id, entityDescription } = action;

  yield put(deleteFetchEntityAction(action));

  const { error } = yield call(deleteEntityById, action);

  if (error)
    yield call(deleteFailureFetchEntityAction, {
      error,
      entityDescription: action.entityDescription,
    });
  else yield put(deleteSuccessFetchEntityAction(entityDescription, id));
}

function* updateByEntityWorker(entityDescription) {
  console.log('entityDescription in updateByEntityWorker', entityDescription);

  yield put(createFetchEntityAction(entityDescription));

  const { error } = yield call(patchEntity, entityDescription);

  if (error) yield put(createFailureEntityAction(error, entityDescription));
  else yield call(fetchByEntityWorker, entityDescription);
}

/**
 * creates an entity worker saga that sends corresponding fields as body
 * to the backend and fetches all entities upon success.
 */
function* createByEntityWorker(entityDescription) {
  console.log('entityDescription in createEntityWorker', entityDescription);

  yield put(createFetchEntityAction(entityDescription));

  const { error } = yield call(createEntity, entityDescription);

  if (error) yield put(createFailureEntityAction(error, entityDescription));
  else yield call(fetchByEntityWorker, entityDescription);
}

function* fetchByEntityWorker(entityDescription) {
  yield put(createFetchEntityAction(entityDescription));

  console.log('fetchByEntityWorker entityDescription', entityDescription);

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
  watchers.push(call(createNewMeetingSagaWatcher));
  watchers.push(call(createSaveMeetingSagaWatcher));

  return watchers;
}
