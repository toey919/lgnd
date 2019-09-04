import React, { Component } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Colors } from "../../../config/styles";

const InputMultiSelect = ({ radios, question, input: { value, onChange } }) => {
  return (
    <View>
      <Text style={styles.questionText}>{question}</Text>
      {radios.map(radio => {
        return (
          <Radio
            key={radio.label}
            {...radio}
            onChange={onChange}
            checked={radio.value === value}
          />
        );
      })}
    </View>
  );
};

class Radio extends Component {
  render() {
    const { checked, label, question } = this.props;
    return (
      <TouchableOpacity
        style={styles.container}
        key={label}
        onPress={this.handlePress}
      >
        <View
          style={{
            borderRadius: 15,
            width: 15,
            height: 15,
            marginRight: 15,
            borderColor: Colors.brandSecondary,
            borderWidth: 1,
            backgroundColor: checked ? Colors.brandSecondary : "white"
          }}
        />
        <View>
          <Text style={styles.text}>{label}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  handlePress = () => this.props.onChange(this.props.value);
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },
  text: {
    color: Colors.silver,
    paddingRight: 10
  },
  questionText: {
    color: Colors.gray,
    marginBottom: 15,
    marginTop: 15,
    fontSize: 18
  }
});

export default InputMultiSelect;
