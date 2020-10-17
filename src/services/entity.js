import callApi, { HttpMethod } from 'services/api';

/**
 * Fetches all Entities by given EntityDescription
 * @param {String} param0
 */
export const fetchAllByEntity = ({ entityDescription }) =>
  callApi(`/api/entity/${entityDescription.toLowerCase()}`);

/**
 * Creates new Entity by given EntityDescription
 * @param {String} param0
 * @param {any} body
 */
export const createByEntity = ({ entityDescription }, body) =>
  callApi(`/api/entity/${entityDescription}`, HttpMethod.POST, body);

/**
 * Updates an existing Entity by Id
 * @param {String} param0
 * @param {Number} id
 * @param {any} body
 */
export const patchEntityById = ({ entityDescription }, id, body) =>
  callApi(`/api/entity/${entityDescription}`, HttpMethod.PATCH, { id, body });

/**
 * Deletes an Entity by Id
 * @param {String} param0
 * @param {number} id
 */
export const deleteEntityById = ({ entityDescription }, id) =>
  callApi(`/api/entity/${entityDescription}`, HttpMethod.DELETE, id);
