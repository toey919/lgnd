import React from "react";
import Feather from "react-native-vector-icons/Feather";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";
import { Colors } from "../../config/styles";

const NavBar = props => (
  <View style={styles.container}>
    <View style={styles.logo} />
    {props.back && (
      <TouchableOpacity
        onPress={() => Actions.pop()}
        style={styles.featherContainer}
      >
        <Feather color={Colors.brandPrimary} name="chevron-left" size={24} />
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
    paddingTop: 25,
    backgroundColor: "white"
  },
  featherContainer: {
    left: 10,
    top: 30,
    position: "absolute"
  },
  logo: {
    alignSelf: "center",
    height: 40
  }
});

export default NavBar;
