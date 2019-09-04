import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { View } from "react-native";

import { resetPassword } from "./AuthActions";
import { InputWithIcon, Button, Spinner } from "../common";
import { Colors } from "../../config/styles";

class ForgotPasswordForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }
  submit(values) {
    this.props.resetPassword(values.email);
  }
  render() {
    const { handleSubmit, loading } = this.props;

    return (
      <View style={{ marginTop: 10, marginBottom: 10 }}>
        <Field
          name="email"
          component={InputWithIcon}
          icon="user"
          placeholder="Email Address"
        />
        {loading ? (
          <Spinner />
        ) : (
          <Button
            onPress={handleSubmit(this.submit)}
            buttonColor={Colors.brandSecondary}
          >
            Reset Password
          </Button>
        )}
      </View>
    );
  }
}

export default reduxForm({
  form: "forgotpassword"
})(
  connect(
    null,
    {
      resetPassword
    }
  )(ForgotPasswordForm)
);
