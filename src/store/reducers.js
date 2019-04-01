import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import configuratorReducer from '../configurator/configuratorReducer';
import { i18nState } from 'redux-i18n';

const rootReducer = combineReducers({
  configuratorStore: configuratorReducer,
  form: formReducer,
  i18nState
});

export default rootReducer;
