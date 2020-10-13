import callApi, { HttpMethod } from 'services/api';
import FormData from 'form-data';

/**
 * Executes a login request
 */
export const login = ({ email, password }) => {
  const formData = new FormData();
  formData.append('email', email);
  formData.append('password', password);

  return callApi('/public/login', HttpMethod.POST, formData);
};

/**
 * Executes a logout request
 */
export const logout = () => callApi('/public/logout', HttpMethod.POST);

/**
 * Call API for the authenticated account
 */
export const fetchAuthenticatedAccount = () => callApi('/public/account');

// export const fetchAccounts = () => callApi("/api/account/");
export const fetchAddAccount = (body) =>
  callApi('/api/account/add', HttpMethod.POST, body);
export const fetchPatchAccount = (body) =>
  callApi('/api/account/patch', HttpMethod.PATCH, body);
export const fetchDeleteAccount = (id) =>
  callApi('/api/account/delete', HttpMethod.DELETE, id);
