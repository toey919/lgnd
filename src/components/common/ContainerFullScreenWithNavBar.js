import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Colors } from "../../config/styles";
import NavBar from "./NavBar";

const ContainerFullScreenWithNavBar = props => (
  <View style={{ flex: 1 }}>
    <NavBar back={props.back} />
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      style={{
        flex: 1,
        backgroundColor: Colors[props.backgroundColor] || "white"
      }}
    >
      <View style={styles.childContainer}>{props.children}</View>
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  childContainer: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 0
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "flex-start"
  }
});

export default ContainerFullScreenWithNavBar;
