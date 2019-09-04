import React, { Component } from "react";
import { View, Image } from "react-native";
import SplashScreen from "react-native-splash-screen";

class LaunchLogo extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }
  render() {
    return (
      <View style={{ flex: 1, alignSelf: "stretch" }}>
        <Image
          source={require("../assets/bootcover.jpg")}
          style={{ flex: 1, width: null, height: null }}
        />
      </View>
    );
  }
}
export default LaunchLogo;
