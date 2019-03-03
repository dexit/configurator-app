import { combineReducers } from 'redux';

import configuratorReducer from '../configurator/configuratorReducer';

const rootReducer = combineReducers({
  configuratorStore: configuratorReducer
});

export default rootReducer;
