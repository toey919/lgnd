import React from "react";
import { View } from "react-native";
import NativeTachyons from "react-native-style-tachyons";

import { Colors, BorderRadius } from "../../config/styles";

const BorderedBox = NativeTachyons.wrap(props => {
  const { children, borderColor, styles, backgroundColor } = props;
  return (
    <View
      style={{
        backgroundColor: backgroundColor || "white",
        borderColor: borderColor || Colors.brandPrimary,
        borderWidth: 2,
        elevation: 2,
        zIndex: 2,
        alignItems: "center",
        justifyContent: "center",
        ...styles
      }}
      cls="pa2"
    >
      {children}
    </View>
  );
});

export default BorderedBox;
