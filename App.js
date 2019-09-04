import React, { Component } from "react";
import { StatusBar, StyleSheet, AsyncStorage } from "react-native";
import { Actions } from "react-native-router-flux";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import Parse from "parse/react-native";
import NativeTachyons from "react-native-style-tachyons";
import { routeOnAuth } from "./src/components/Auth/AuthActions";

import rootReducer from "./rootReducer";
import Router from "./src/Router";
import {
  PARSE_APP_ID,
  PARSE_SERVER_URL,
  PARSE_JS_KEY
} from "./src/config/globals";
import { SET_USER, USER_LOADING } from "./src/components/User/UserTypes";

StatusBar.setBarStyle("dark-content", true);
const store = createStore(rootReducer, {}, applyMiddleware(ReduxThunk));

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize(PARSE_APP_ID, PARSE_JS_KEY);
Parse.applicationId = PARSE_APP_ID;
Parse.serverURL = PARSE_SERVER_URL;
Parse.clientKey = PARSE_JS_KEY;
Parse.javascriptKey = PARSE_JS_KEY;
window.Parse = Parse;

Parse.User.currentAsync()
  .then(user => {
    if (user) {
      user.fetch({
        success(currentUser) {
          store.dispatch({ type: SET_USER, payload: currentUser });
          routeOnAuth(currentUser);
          setTimeout(
            () => store.dispatch({ type: USER_LOADING, payload: false }),
            500
          );
        },
        error(error) {
          store.dispatch({ type: USER_LOADING, payload: false });
          setTimeout(() => {
            Actions.SignIn(), 1000;
          });
          console.log("err", error);
        }
      });
    } else {
      setTimeout(() => {
        Actions.SignIn(), 1000;
      });
      store.dispatch({ type: USER_LOADING, payload: false });
    }
  })
  .catch(err => {
    setTimeout(() => {
      Actions.SignIn(), 1000;
    });
  });

NativeTachyons.build(
  {
    rem: 16
  },
  StyleSheet
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
