import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { Keyboard } from "react-native";

import { Colors } from "../../config/styles";
import { signUpUser, clearError } from "./AuthActions";
import AuthFormWrapper from "./AuthFormWrapper";

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }
  submit(values) {
    Keyboard.dismiss();
    this.props.clearError();
    this.props.signUpUser(values.email, values.password);
  }
  render() {
    const { handleSubmit, loading, error, authError, anyTouched } = this.props;
    return (
      <AuthFormWrapper
        onPress={handleSubmit(this.submit)}
        buttonColor={Colors.brandSecondary}
        authError={authError}
        error={error}
        anyTouched={anyTouched}
        loading={loading}
        buttonText="Sign Up"
      />
    );
  }
}

const validate = values => {
  const passwordRegex = new RegExp("^(?=.*?[A-Z])(?=.*?[0-9])");
  const errors = {};
  if (!values.email) {
    errors._error = "Email is required";
  }
  if (!values.password) {
    errors._error = "Password is required";
  }
  if (!passwordRegex.test(values.password)) {
    errors._error =
      "Password should contain at least one uppercase letter and at least one number.";
  }
  return errors;
};

const mapStateToProps = ({ AuthReducer }) => {
  const { loading, authed, authError } = AuthReducer;
  return {
    loading,
    authed,
    authError
  };
};

export default reduxForm({
  form: "signup",
  validate
})(
  connect(
    mapStateToProps,
    {
      signUpUser,
      clearError
    }
  )(SignUpForm)
);
