import { action } from "redux/actions";

export const APPOINTMENTS = "APPOINTMENTS";
export const APPOINTMENTS_SUCCESS = "APPOINTMENTS_SUCCESS";
export const APPOINTMENTS_FAILURE = "APPOINTMENTS_FAILURE";

export const APPOINTMENT_ADD = "APPOINTMENTS_ADD";
export const APPOINTMENT_ADD_SUCCESS = "APPOINTMENTS_ADD_SUCCESS";
export const APPOINTMENT_ADD_FAILURE = "APPOINTMENTS_ADD_FAILURE";

export const APPOINTMENT_PATCH = "APPOINTMENT_PATCH";
export const APPOINTMENT_PATCH_SUCCESS = "APPOINTMENT_PATCH_SUCCESS";
export const APPOINTMENT_PATCH_FAILURE = "APPOINTMENT_PATCH_FAILURE";

export const APPOINTMENT_DELETE = "APPOINTMENT_DELETE";
export const APPOINTMENT_DELETE_SUCCES = "APPOINTMENT_DELETE_SUCCES";
export const APPOINTMENT_DELETE_FAILURE = "APPOINTMENT_DELETE_FAILURE";

export const successAppointments = ({ data }) =>
  action(APPOINTMENTS_SUCCESS, { data });
export const failureAppointments = (error) =>
  action(APPOINTMENTS_FAILURE, { error });

export const successAddAppointment = (appointment) =>
  action(APPOINTMENT_ADD_SUCCESS, { appointment });
export const failureAddAppointment = (error) =>
  action(APPOINTMENT_ADD_FAILURE, { error });

export const successPatchAppointment = (appointment) =>
  action(APPOINTMENT_PATCH_SUCCESS, { appointment });
export const failurePatchAppointment = (error) =>
  action(APPOINTMENT_PATCH_FAILURE, { error });

export const successDeleteAppointment = (id) =>
  action(APPOINTMENT_DELETE_SUCCES, { id });
export const failureDeleteAppointment = (error) =>
  action(APPOINTMENT_DELETE_FAILURE, { error });
