import React, { Component } from "react";
import { Image, View, Text } from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";

import { Colors } from "../../config/styles";
import { Card, ContainerFullScreen } from "../common";
import { clearError } from "./AuthActions";

class AuthSceneWrapper extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      bottomText,
      authAction,
      children,
      routeText,
      clearError
    } = this.props;

    return (
      <ContainerFullScreen backgroundColor="nearWhite">
        <View
          style={{
            flex: 1,
            justifyContent: "center"
          }}
        >
          <Image
            style={{
              height: 150,
              alignSelf: "center",
              marginBottom: 50
            }}
            resizeMode="contain"
            source={require("../../assets/lgnd-logo-centered.png")}
          />
          <Card shadow style={{}}>
            {children}
            <View
              style={{
                alignItems: "center",
                padding: 30,
                backgroundColor: Colors.nearWhite,
                marginLeft: -15,
                marginBottom: -15,
                marginRight: -15,
                marginTop: 20,
                borderWidth: 0
              }}
            >
              <Text style={{ color: Colors["silver"] }}>
                {bottomText}
                <Text
                  style={{
                    color: Colors.brandPrimary,
                    textDecorationLine: "underline"
                  }}
                  onPress={() => {
                    clearError();
                    authAction();
                  }}
                >
                  {routeText}
                </Text>
              </Text>
            </View>
          </Card>
          <Text
            style={{
              color: Colors.darkGrey,
              textDecorationLine: "underline",
              textAlign: "center",
              fontSize: 16,
              fontWeight: "600",
              marginTop: 30,
              marginBottom: 20
            }}
            onPress={() => {
              clearError();
              Actions.ForgotPassword();
            }}
          >
            Forgot your Password?
          </Text>
        </View>
      </ContainerFullScreen>
    );
  }
}

export default connect(
  null,
  {
    clearError
  }
)(AuthSceneWrapper);
