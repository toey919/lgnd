import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

import { Colors } from "../../../config/styles";

const InputMultiSelect = props => (
  <View>
    {props.options.map(option => (
      <TouchableOpacity style={styles.container} key={option.label}>
        <View
          style={{
            borderRadius: 15,
            width: 15,
            height: 15,
            marginRight: 15,
            borderColor: Colors.brandSecondary,
            borderWidth: 1,
            backgroundColor:
              props.selected === option ? Colors.brandSecondary : "white"
          }}
        />
        <Text style={styles.text}>{option.label}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },
  text: {
    color: Colors.silver
  }
});

export default InputMultiSelect;
