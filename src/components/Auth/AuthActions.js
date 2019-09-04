import { Actions } from "react-native-router-flux";
import { reset } from "redux-form";
import {
  AUTHENTICATED,
  AUTH_LOADING,
  AUTH_ERROR,
  CLEAR_ERROR,
  RESET_EMAIL_SENT,
  UNAUTH
} from "./AuthTypes";

import { SET_USER } from "../User/UserTypes";

export const routeOnAuth = user => {
  if (user.attributes.name) {
    setTimeout(() => Actions.NavTabBar(), 1000);
  } else {
    setTimeout(() => Actions.CreateProfile(), 1000);
  }
};

export const signInUser = (email, password) => dispatch => {
  dispatch({
    type: AUTH_LOADING
  });
  Parse.User.logIn(email, password, {
    success: user => {
      dispatch({
        type: AUTHENTICATED
      });
      dispatch({
        type: SET_USER,
        payload: user
      });
      routeOnAuth(user);
    },
    error: (user, error) => {
      dispatch({
        type: AUTH_ERROR,
        payload: error
      });
    }
  });
};

export const signUpUser = (email, password) => dispatch => {
  dispatch({ type: AUTH_LOADING });
  const USER = new Parse.User();
  USER.signUp(
    {
      username: email,
      email,
      password,
      role: "user"
    },
    {
      success(user) {
        dispatch({
          type: AUTHENTICATED
        });
        dispatch({
          type: SET_USER,
          payload: user
        });
        Actions.CreateProfile();
      },
      error(user, error) {
        console.log("error", error);
        dispatch({
          type: AUTH_ERROR,
          payload: error
        });
      }
    }
  );
};

export const resetPassword = email => dispatch => {
  dispatch({ type: AUTH_LOADING });

  Parse.User.requestPasswordReset(email, {
    success() {
      dispatch({ type: RESET_EMAIL_SENT });
    },
    error(error) {
      dispatch({
        type: AUTH_ERROR,
        payload: error
      });
    }
  });
};

export const clearError = () => dispatch => {
  dispatch({ type: CLEAR_ERROR });
};

export const signOutUser = () => dispatch => {
  Parse.User.logOut().then(() => {
    dispatch(reset("signin"));
    dispatch(reset("signup"));
    Actions.SignIn();
    dispatch({
      type: UNAUTH
    });
  });
};
