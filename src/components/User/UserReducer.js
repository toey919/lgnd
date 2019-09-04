import { SET_USER, USER_LOADING, UNAUTH } from './UserTypes';

const INITIAL_STATE = {
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload
      };
    case UNAUTH:
      return {
        ...state,
        user: undefined
      };
    case USER_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
};
