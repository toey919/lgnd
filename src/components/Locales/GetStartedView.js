import React from "react";
import { Actions } from "react-native-router-flux";
import { Text, View, StyleSheet } from "react-native";
import { Button, Title } from "../common";
import { Colors } from "../../config/styles";

const GetStartedView = props => (
  <View style={styles.container}>
    <View>
      <Title fontSize={26}>LET'S LEARN MORE ABOUT YOU</Title>
      <Text style={styles.text}>What makes a LGND Pack special?</Text>
      <Text style={styles.text}>
        A LGND Pack is a pack of recommendations provided by a real person that
        shares your interests and understands your requirements for this trip.
      </Text>
      <Text style={styles.text}>
        Next you'll answer a few quick questions that will connect you to the
        right LGND Guide and LGND Pack for this destination.
      </Text>
    </View>
    <Button
      style={{ marginBottom: 50 }}
      smallPadding
      fontSize={20}
      onPress={() => Actions.Survey()}
    >
      GET STARTED
    </Button>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10,
    justifyContent: "space-between",
    flex: 1
  },
  text: {
    color: Colors.silver,
    textAlign: "center",
    margin: 10,
    fontSize: 18
  }
});

export default GetStartedView;
