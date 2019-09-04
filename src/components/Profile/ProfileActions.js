import { Actions } from 'react-native-router-flux';
import { change, reset } from 'redux-form';
import {
  PROFILE_LOADING,
  PROFILE_ERROR,
  DELETE_PROFILE_LOADING
} from './ProfileTypes';

import { SET_USER, UNAUTH } from '../User/UserTypes';

export const updateProfileError = error => ({
  type: PROFILE_ERROR,
  payload: error
});

export const updateProfileLoading = value => ({
  type: PROFILE_LOADING,
  payload: value
});

export const deleteProfileLoading = value => ({
  type: DELETE_PROFILE_LOADING,
  payload: value
});

export const setProfile = user => ({
  type: SET_USER,
  payload: user
});
function _updateUser(user) {
  return {
    type: SET_USER,
    payload: user
  };
}
export const updateField = (formName, fieldName, value) => (dispatch) => {
  dispatch(change(formName, fieldName, value));
};

export const updateProfile = (data, create) => (dispatch) => {
  dispatch(updateProfileLoading(true));
  Parse.Cloud.run("updateUser", data)
    .then((res) => {
      dispatch(updateProfileLoading(false));
      dispatch(setProfile(res));
      if (create) {
        Actions.NavTabBar();
      }
    })
    .catch((error) => {
      dispatch(updateProfileError(error));
    });
};

export const deleteAccount = () => (dispatch) => {
  dispatch(deleteProfileLoading(true));
  const currentUser = Parse.User.current();
  const userId = currentUser.id;
  Parse.User.logOut()
    .then(() => {
      Parse.Cloud.run("removeUser", { userId })
        .then(() => {
          dispatch(deleteProfileLoading(false));
          dispatch(reset('signin'));
          dispatch(reset('signup'));
          Actions.popTo('SignIn');
          dispatch({
            type: UNAUTH,
          });
        })
        .catch((error) => {
          console.log("err", error);
          dispatch(updateProfileError(error));
        });
    });
};
