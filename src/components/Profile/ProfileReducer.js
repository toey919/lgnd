import {
  PROFILE_LOADING,
  PROFILE_ERROR,
  DELETE_PROFILE_LOADING
} from './ProfileTypes';

const INITIAL_STATE = {
  profileLoading: false,
  deleteProfileLoading: false,
  error: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        profileLoading: action.payload
      };
    case DELETE_PROFILE_LOADING:
      return {
        ...state,
        deleteProfileLoading: action.payload,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        profileLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
