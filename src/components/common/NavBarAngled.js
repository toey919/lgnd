import React from "react";
import {
  View,
  Image,
  Text,
  Dimensions,
  ImageBackground,
  StyleSheet
} from "react-native";
import { Colors } from "../../config/styles";

const NavBarAngled = props => {
  const backgroundImage = props.backgroundBook
    ? require("../../assets/book_background.jpg")
    : require("../../assets/people_background.jpg");
  return (
    <ImageBackground source={backgroundImage} style={styles.spinnerStyle}>
      <View style={styles.transparentOverlay} />
      <Text style={styles.labelStyle}>
        {props.label ? props.label.toUpperCase() : ""}
      </Text>
      <Image
        source={require("../../assets/lgnd_favicon.png")}
        resizeMode="contain"
        style={{
          height: 60,
          width: 60,
          position: "absolute",
          top: 35,
          right: 20,
          zIndex: 1000
        }}
      />
      <View style={styles.slantedBottom} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  labelStyle: {
    color: "white",
    fontSize: 30,
    marginLeft: 20
  },
  spinnerStyle: {
    paddingTop: 150,
    paddingBottom: 30,
    backgroundColor: Colors.brandSecondary
  },
  transparentOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(120,85,139,0.7)"
  },
  slantedBottom: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: Dimensions.get("window").width,
    borderRightWidth: 0,
    borderBottomWidth: 30,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#fff"
  }
});

export default NavBarAngled;
