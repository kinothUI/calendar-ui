import callApi, { HttpMethod } from 'services/api';

/**
 * Fetches all Entities by given EntityDescription
 * @param {String} param0
 */
export const fetchAllByEntity = ({ entityDescription }) =>
  callApi(`/api/${entityDescription.toLowerCase()}`);

/**
 * Creates new Entity by given EntityDescription
 * @param {String} param0
 * @param {any} body
 */
export const createEntity = ({ entityDescription, body }) =>
  callApi(`/api/${entityDescription.toLowerCase()}`, HttpMethod.POST, body);

/**
 * Updates an existing Entity by Id
 * @param {String} param0
 * @param {Number} id
 * @param {any} body
 */
export const patchEntity = ({ entityDescription, body }) =>
  callApi(`/api/${entityDescription.toLowerCase()}`, HttpMethod.PATCH, body);

/**
 * Deletes an Entity by Id
 * @param {String} param0
 * @param {number} id
 */
export const deleteEntityById = ({ entityDescription, id }) =>
  callApi(`/api/${entityDescription.toLowerCase()}`, HttpMethod.DELETE, { id });
