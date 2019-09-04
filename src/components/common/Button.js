import React from "react";
import { TouchableOpacity, Text } from "react-native";
import NativeTachyons from "react-native-style-tachyons";

import { Colors, BorderRadius } from "../../config/styles";

const Button = NativeTachyons.wrap(props => {
  const {
    fontColor,
    buttonColor,
    borderRadius,
    onPress,
    children,
    fontSize,
    fontWeight,
    style,
    smallPadding,
    smallButton
  } = props;
  return smallButton ? (
    <TouchableOpacity onPress={onPress} style={style}>
      <Text
        style={{
          color: fontColor || Colors.white,
          borderRadius: borderRadius || 0,
          overflow: "hidden",
          fontWeight,
          fontSize
        }}
        cls="pv1 ph2 tc"
      >
        {children}
      </Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={onPress} style={style}>
      <Text
        style={{
          color: fontColor || Colors.white,
          borderRadius: borderRadius || 0,
          backgroundColor: buttonColor || Colors.brandPrimary,
          overflow: "hidden",
          fontWeight,
          fontSize
        }}
        cls={smallPadding ? "ph3 pv2 tc" : "pa3 tc"}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
});

export default Button;
