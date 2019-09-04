import React, { Component } from "react";
import { TextInput, View, Text, TouchableOpacity } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import NativeTachyons from "react-native-style-tachyons";

import { Colors, BorderRadius } from "../../../config/styles";

export default NativeTachyons.wrap(
  class InputEditable extends Component {
    constructor(props) {
      super(props);
      this.state = {
        inputInFocus: false
      };
      this.forceFocus = this.forceFocus.bind(this);
      this.forceBlur = this.forceBlur.bind(this);
    }

    forceFocus() {
      this.setState({ inputInFocus: true });
    }

    forceBlur() {
      this.setState({ inputInFocus: false }, () =>
        this.props.handleSubmit(this.props.input)
      );
    }

    render() {
      const {
        input,
        fontColor,
        borderRadius,
        borderColor,
        autoCapitalize,
        ...inputProps
      } = this.props;
      return (
        <View style={this.props.style}>
          {this.state.inputInFocus ? (
            <View cls="flx-row aic mb3 ba" style={styles.cardStyle}>
              <View style={{ width: "85%" }}>
                <Text style={styles.labelStyle}>{inputProps.label}</Text>
                <TextInput
                  ref={r => {
                    if (r) r.focus();
                  }}
                  keyboardType={inputProps.keyboardType || "default"}
                  underlineColorAndroid="rgba(0,0,0,0)"
                  autoCorrect={false}
                  editable={this.state.inputInFocus}
                  autoCapitalize={autoCapitalize || "none"}
                  onChangeText={input.onChange}
                  onBlur={this.forceBlur}
                  value={input.value}
                  secureTextEntry={input.name === "password"}
                  placeholder={inputProps.initialValue}
                  style={styles.textInputStyle}
                />
              </View>
              <View style={styles.featherParentStyle}>
                <Feather
                  name="check"
                  size={inputProps.size || 20}
                  onPress={this.forceBlur}
                  color={Colors.black}
                  style={styles.featherIconStyle}
                />
              </View>
            </View>
          ) : (
            <View cls="flx-row aic mb3 ba" style={styles.cardStyle}>
              <View style={{ width: "85%" }}>
                <Text style={styles.labelStyle}>{inputProps.label}</Text>
                <TextInput
                  keyboardType={inputProps.keyboardType || "default"}
                  underlineColorAndroid="rgba(0,0,0,0)"
                  autoCorrect={false}
                  editable={this.state.inputInFocus}
                  autoCapitalize="none"
                  onChangeText={input.onChange}
                  onFocus={() => {
                    this.setState({ inputInFocus: true });
                  }}
                  onBlur={() => this.setState({ inputInFocus: false })}
                  value={input.value || inputProps.initialValue}
                  secureTextEntry={input.name === "password"}
                  placeholder={inputProps.placeholder}
                  style={styles.textInputStyle}
                />
              </View>
              <TouchableOpacity
                style={styles.featherParentStyle}
                onPress={this.forceFocus}
              >
                <Feather
                  name="edit-2"
                  size={inputProps.size || 20}
                  color={Colors.moonGray}
                  style={styles.featherIconStyle}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      );
    }
  }
);

const styles = {
  cardStyle: {
    flex: 1,
    borderColor: Colors.moonGray,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 15,
    paddingBottom: 15,
    justifyContent: "space-between"
  },
  featherParentStyle: {
    alignSelf: "flex-end",
    width: "15%",
    display: "flex",
    justifyContent: "flex-end",
    height: "100%"
  },
  featherIconStyle: {
    width: 20,
    height: 20,
    alignSelf: "flex-end"
  },
  textInputStyle: {
    color: Colors.primaryDeepGrey
  },
  labelStyle: {
    fontSize: 14,
    color: Colors.silver,
    marginBottom: 10
  }
};
