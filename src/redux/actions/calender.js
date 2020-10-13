import { action } from '.';

export const ADD_MONTH = 'ADD_MONTH';
export const SUBTRACT_MONTH = 'SUBTRACT_MONTH';

export const addMonth = (moment) => action(ADD_MONTH, { moment });
export const subtractMonth = (moment) => action(SUBTRACT_MONTH, { moment });
