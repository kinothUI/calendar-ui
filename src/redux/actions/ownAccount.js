import { action } from 'redux/actions';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export const REQUEST_OWN_ACCOUNT = 'REQUEST_OWN_ACCOUNT';
export const FETCH_OWN_ACCOUNT = 'FETCH_OWN_ACCOUNT';
export const SUCCESS_FETCH_OWN_ACCOUNT = 'SUCCESS_FETCH_OWN_ACCOUNT';
export const FAILURE_FETCH_OWN_ACCOUNT = 'FAILURE_FETCH_OWN_ACCOUNT';

export const PATCH_OWN_ACCOUNT = 'PATCH_OWN_ACCOUNT';
export const SUCCESS_PATCH_OWN_ACCOUNT = 'SUCCESS_PATCH_OWN_ACCOUNT';
export const FAILURE_PATCH_OWN_ACCOUNT = 'FAILURE_PATCH_OWN_ACCOUNT';

export const ACCOUNTS = 'ACCOUNTS';
export const ACCOUNTS_SUCCESS = 'ACCOUNTS_SUCCESS';
export const ACCOUNTS_FAILURE = 'ACCOUNTS_FAILURE';

export const ACCOUNT_ADD = 'ACCOUNT_ADD';
export const ACCOUNT_ADD_SUCCESS = 'ACCOUNT_ADD_SUCCESS';
export const ACCOUNT_ADD_FAILURE = 'ACCOUNT_ADD_FAILURE';

export const ACCOUNT_PATCH = 'ACCOUNT_PATCH';
export const ACCOUNT_PATCH_SUCCESS = 'ACCOUNT_PATCH_SUCCESS';
export const ACCOUNT_PATCH_FAILURE = 'ACCOUNT_PATCH_FAILURE';

export const ACCOUNT_DELETE = 'ACCOUNT_DELETE';
export const ACCOUNT_DELETE_SUCCESS = 'ACCOUNT_DELETE_SUCCESS';
export const ACCOUNT_DELETE_FAILURE = 'ACCOUNT_DELETE_FAILURE';

export const requestOwnAccount = () => action(REQUEST_OWN_ACCOUNT);
export const fetchOwnAccount = () => action(FETCH_OWN_ACCOUNT);
export const successFetchOwnAccount = (response) =>
  action(SUCCESS_FETCH_OWN_ACCOUNT, { response });
export const failureFetchOwnAccount = (error) =>
  action(FAILURE_FETCH_OWN_ACCOUNT, { error });

export const successLogout = (response) => action(LOGOUT_SUCCESS, { response });
export const failureLogout = (error) => action(LOGOUT_FAILURE, { error });

export const successAccounts = ({ data }) => action(ACCOUNTS_SUCCESS, { data });
export const failureAccount = (error) => action(ACCOUNTS_FAILURE, { error });

export const successAddAccount = (account) =>
  action(ACCOUNT_ADD_SUCCESS, { account });
export const failureAddAccount = (error) =>
  action(ACCOUNT_ADD_FAILURE, { error });

export const successPatchAccount = (account) =>
  action(ACCOUNT_PATCH_SUCCESS, { account });
export const failurePatchAccount = (error) =>
  action(ACCOUNT_PATCH_FAILURE, { error });

export const successDeleteAccount = (id) =>
  action(ACCOUNT_DELETE_SUCCESS, { id });
export const failureDeleteAccount = (error) =>
  action(ACCOUNT_DELETE_FAILURE, { error });
