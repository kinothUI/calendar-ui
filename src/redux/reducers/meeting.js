import { SAVE_SUCCESS } from 'redux/actions/meeting';

const InitialState = {
  content: [],
};

export default function meetingReducer(state = InitialState, action) {
  switch (action.type) {
    case SAVE_SUCCESS:
      return { ...state, content: [].concat(...state.content, action.meeting) };

    default:
      return state;
  }
}
