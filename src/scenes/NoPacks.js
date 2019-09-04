import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";
import { Colors } from "../config/styles";
import { ContainerFullScreen, Button } from "../components/common";

const MyPacks = () => (
  <ContainerFullScreen back>
    <View style={styles.containerStyle}>
      <Text style={styles.textStyle}>Oh man...</Text>
      <Text style={styles.textStyle}>
        Looks like there are no available LGND packs based on your survey
        criteria. Try again!
      </Text>
      <Button
        buttonColor={Colors.brandPrimary}
        smallPadding
        onPress={() => {
          Actions.LocalesList();
        }}
        fontSize={20}
        style={{ marginTop: 20 }}
      >
        TAKE NEW SURVEY
      </Button>
    </View>
  </ContainerFullScreen>
);

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "flex-start",
    padding: 20
  },
  textStyle: {
    color: Colors.brandPrimary,
    fontSize: 20,
    fontWeight: "400",
    textAlign: "center"
  }
});
export default MyPacks;
