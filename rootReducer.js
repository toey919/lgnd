import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import AuthReducer from './src/components/Auth/AuthReducer';
import ProfileReducer from './src/components/Profile/ProfileReducer';
import UserReducer from './src/components/User/UserReducer';
import LocaleReducer from './src/components/Locales/LocaleReducer';
import SurveyReducer from './src/components/Locales/SurveyReducer';
import PackReducer from './src/components/Packs/PackReducer';

// TODO combine locale & survey reducers
const rootReducer = combineReducers({
  state: (state = {}) => state,
  form,
  AuthReducer,
  ProfileReducer,
  UserReducer,
  SurveyReducer,
  LocaleReducer,
  PackReducer
});

export default rootReducer;
