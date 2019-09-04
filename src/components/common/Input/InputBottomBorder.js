import React, { Component } from "react";
import { TextInput, View, Text } from "react-native";
import NativeTachyons from "react-native-style-tachyons";
import { Colors, BorderRadius } from "../../../config/styles";

export default NativeTachyons.wrap(
  class InputBottomBorder extends Component {
    render() {
      const {
        input,
        meta,
        fontColor,
        borderRadius,
        borderColor,
        multiline,
        numberOfLines,
        borderBottomWidth,
        textColor,
        placeholderTextColor,
        autoCapitalize,
        returnKeyType,
        onEnter,
        refField,
        ...inputProps
      } = this.props;
      const { touched, error } = meta;
      return (
        <View
          style={{
            marginBottom: 10
          }}
        >
          <TextInput
            ref={refField}
            keyboardType={inputProps.keyboardType || "default"}
            autoCorrect={false}
            autoCapitalize={autoCapitalize || "none"}
            onChangeText={input.onChange}
            onFocus={e => {
              input.onFocus(e);
              this.setState({ inputInFocus: true });
            }}
            onBlur={e => {
              input.onBlur(e);
              this.setState({ inputInFocus: false });
            }}
            value={input.value}
            returnKeyType="next"
            onSubmitEditing={onEnter}
            blurOnSubmit={false}
            placeholder={inputProps.placeholder}
            placeholderTextColor={
              touched ? Colors.darkRed : Colors.brandPrimary
            }
            style={{
              color: fontColor || Colors.moonGray,
              borderBottomColor: borderColor
                ? Colors[borderColor]
                : Colors.moonGray,
              borderBottomWidth,
              borderTopWidth: 0,
              borderLeftWidth: 0,
              borderRightWidth: 0,
              paddingLeft: 10,
              paddingTop: 10,
              paddingBottom: 10,
              paddingRight: 10,
              textAlign: "right"
            }}
            cls="ba f5 flx-i"
          />
        </View>
      );
    }
  }
);
