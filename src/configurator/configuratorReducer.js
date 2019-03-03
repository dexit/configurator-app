import * as constants from '../store/constants';

const initialState = {
  itWorks: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.TEST_ACTION:
      return { ...state, itWorks: true };
    default:
      return state;
  }
};
