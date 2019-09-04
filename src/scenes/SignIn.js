import React from "react";
import { Actions } from "react-native-router-flux";

import SignInForm from "../components/Auth/SignInForm";
import AuthSceneWrapper from "../components/Auth/AuthSceneWrapper";

const SignIn = () => (
  <AuthSceneWrapper
    bottomText="New to LGND?&nbsp;"
    authAction={Actions.SignUp}
    routeText="Sign Up!"
  >
    <SignInForm />
  </AuthSceneWrapper>
);

export default SignIn;
