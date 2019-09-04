import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import NativeTachyons from "react-native-style-tachyons";

import { Colors, BorderRadius } from "../../../config/styles";

export default NativeTachyons.wrap(
  class DropdownInput extends Component {
    constructor(props) {
      super(props);
      this.state = {
        inputInFocus: false
      };
    }
    render() {
      const {
        onPress,
        input,
        value,
        initialValue,
        fontColor,
        borderRadius,
        borderColor,
        children,
        ...inputProps
      } = this.props;
      return (
        <TouchableOpacity
          cls="flx-row aic mb3"
          onPress={() => onPress()}
          style={{ backgroundColor: Colors.white }}
        >
          <Text
            style={{
              height: 45,
              color: fontColor ? Colors[fontColor] : Colors.primaryGrey,
              borderRadius: borderRadius
                ? BorderRadius[borderRadius].all
                : BorderRadius["medium"].all,
              borderColor: borderColor ? Colors[borderColor] : Colors.moonGray,
              borderWidth: 1,
              paddingHorizontal: 20,
              paddingVertical: 10
            }}
            cls="ba f5 flx-i"
          >
            {value || initialValue}
          </Text>
          <View
            style={{
              borderRightColor: borderColor
                ? Colors[borderColor]
                : Colors.nearWhite,
              borderRightWidth: 1,
              height: 33,
              display: "flex",
              top: 7,
              right: 2,
              backgroundColor: Colors.white
            }}
            cls="absolute"
          >
            <Feather
              name={inputProps.icon}
              size={inputProps.size || 20}
              color={!this.state.inputInFocus ? Colors.brandPrimary : "red"}
              style={{
                marginTop: 5,
                marginLeft: 10,
                marginRight: 9
              }}
            />
          </View>
          {children}
        </TouchableOpacity>
      );
    }
  }
);
