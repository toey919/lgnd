import React, { Component } from "react";
import { Image, View, Text } from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";

import Card from "../components/common/Card";
import { ContainerFullScreen } from "../components/common";
import ForgotPasswordForm from "../components/Auth/ForgotPasswordForm";
import { clearError } from "../components/Auth/AuthActions";
import { Colors } from "../config/styles";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { authError, resetEmailSent, loading } = this.props;
    return (
      <ContainerFullScreen backgroundColor="nearWhite">
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Image
            style={{
              height: 130,
              alignSelf: "center",
              marginBottom: 50
            }}
            resizeMode="contain"
            source={require("../assets/lgnd-logo-centered.png")}
          />
          <Card shadow>
            <ForgotPasswordForm loading={loading} />
            {authError && (
              <Text style={{ textAlign: "center", color: Colors.darkRed }}>
                {authError}
              </Text>
            )}
            {resetEmailSent && (
              <Text
                style={{ textAlign: "center", color: Colors.brandSecondary }}
              >
                You will receive an email shortly to reset your password.
              </Text>
            )}
          </Card>
          <Text
            style={{
              color: Colors.darkGrey,
              textDecorationLine: "underline",
              textAlign: "center",
              fontSize: 16,
              marginTop: 30,
              marginBottom: 20
            }}
            onPress={() => {
              clearError();
              Actions.popTo("SignIn");
            }}
          >
            Return to Sign in
          </Text>
        </View>
      </ContainerFullScreen>
    );
  }
}

const mapStateToProps = ({ AuthReducer }) => {
  const { loading, resetEmailSent, authError } = AuthReducer;
  return {
    loading,
    resetEmailSent,
    authError
  };
};

export default connect(
  mapStateToProps,
  {
    clearError
  }
)(ForgotPassword);
