import callApi, { HttpMethod } from "services/api";

export const fetchAppointments = () => callApi("/api/appointment/");
export const fetchAddAppointment = (body) =>
  callApi("/api/appointment/add", HttpMethod.POST, body);
export const fetchPatchAppointment = (body) =>
  callApi("/api/appointment/patch", HttpMethod.PATCH, body);
export const fetchDeleteAppointment = (id) =>
  callApi("/api/appointment/delete", HttpMethod.DELETE, id);
