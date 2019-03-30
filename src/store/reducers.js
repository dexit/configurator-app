import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import configuratorReducer from '../configurator/configuratorReducer';

const rootReducer = combineReducers({
  configuratorStore: configuratorReducer,
  form: formReducer
});

export default rootReducer;
