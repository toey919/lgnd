import {
  AUTHENTICATED,
  AUTH_LOADING,
  AUTH_ERROR,
  CLEAR_ERROR,
  RESET_EMAIL_SENT,
  UNAUTH
} from "./AuthTypes";

const INITIAL_STATE = {
  loading: false,
  authError: null,
  authenticated: false,
  user: null,
  resetEmailSent: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTHENTICATED:
      return {
        ...INITIAL_STATE,
        authenticated: true
      };
    case AUTH_LOADING:
      return {
        ...INITIAL_STATE,
        loading: true
      };
    case RESET_EMAIL_SENT:
      return {
        ...INITIAL_STATE,
        resetEmailSent: true
      };
    case CLEAR_ERROR:
      return {
        ...state,
        authError: null
      };
    case AUTH_ERROR:
      switch (action.payload.code) {
        case 101:
          return {
            ...INITIAL_STATE,
            authError: "Email/Password Combination is Incorrect"
          };
        case 125:
          return {
            ...INITIAL_STATE,
            authError: action.payload.message
          };
        case 202:
          return {
            ...INITIAL_STATE,
            authError:
              "Email already exists, please log in with your username and password. If you forgot your password, use the link below to reset it"
          };
        case 205:
          const authErrorMessage = action.payload.message;
          return {
            ...INITIAL_STATE,
            authError:
              authErrorMessage.charAt(0).toUpperCase() +
              authErrorMessage.slice(1)
          };
        default:
          return {
            ...INITIAL_STATE,
            authError: "An error has occured. Please try again."
          };
      }
    case UNAUTH:
      return {
        ...INITIAL_STATE
      };
    default:
      return state;
  }
};
