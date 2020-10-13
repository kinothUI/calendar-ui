import _ from 'lodash';
import moment from 'moment';

import { ADD_MONTH, SUBTRACT_MONTH } from 'redux/actions/calender';

const newDate = moment();

const InitialState = {
  content: { currentMonth: newDate },
  isFetching: false,
  error: undefined,
};

function calendarReducer(state = InitialState, action) {
  switch (action.type) {
    case ADD_MONTH:
      return _.assign({}, state, {
        content: { currentMonth: moment(action.moment).add(1, 'months') },
      });
    case SUBTRACT_MONTH:
      return _.assign({}, state, {
        content: { currentMonth: moment(action.moment).subtract(1, 'months') },
      });
    default:
      return state;
  }
}

export default calendarReducer;
