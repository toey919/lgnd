import React from "react";
import { Actions } from "react-native-router-flux";

import SignUpForm from "../components/Auth/SignUpForm";
import AuthSceneWrapper from "../components/Auth/AuthSceneWrapper";

const SignUp = () => (
  <AuthSceneWrapper
    bottomText="Already have an account?&nbsp;"
    authAction={Actions.SignIn}
    routeText="Log in"
  >
    <SignUpForm />
  </AuthSceneWrapper>
);

export default SignUp;
