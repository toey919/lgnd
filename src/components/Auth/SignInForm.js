import React, { Component } from "react";
import { Keyboard } from "react-native";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { Colors } from "../../config/styles";
import { signInUser, clearError } from "./AuthActions";
import AuthFormWrapper from "./AuthFormWrapper";

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }
  submit(values) {
    Keyboard.dismiss();
    this.props.clearError();
    this.props.signInUser(values.email, values.password);
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
        buttonText="Log In"
      />
    );
  }
}

const validate = values => {
  const errors = {};
  if (!values.email || !values.password) {
    errors._error = "Email and password are required";
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
  form: "signin",
  validate
})(
  connect(
    mapStateToProps,
    {
      signInUser,
      clearError
    }
  )(SignInForm)
);
