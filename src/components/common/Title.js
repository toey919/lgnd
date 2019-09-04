// TODO: Remove Native Tachyons

/**
 * Title text  for scenes
 * @name Title
 * @memberof common
 * @param {string} props.fontColor - font color for title
 * @param {number} props.fontSize - font size for title
 * @param {string} props.fontWeight - font weight for title
 * @param {Object} props.style - style overrides
 */

import React from "react";
import { Text, Platform } from "react-native";
import NativeTachyons from "react-native-style-tachyons";

import { Colors } from "../../config/styles";

const Title = NativeTachyons.wrap(props => {
  const { fontColor, children, fontSize, fontWeight, style } = props;
  return (
    <Text
      style={{
        color: fontColor || Colors.brandPrimary,
        fontWeight,
        fontSize,
        marginBottom: 20,
        ...style
      }}
      cls="tc"
    >
      {children}
    </Text>
  );
});

export default Title;
