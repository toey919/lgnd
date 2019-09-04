import React from "react";
import { View } from "react-native";
import NativeTachyons from "react-native-style-tachyons";

import { Colors, BorderRadius } from "../../config/styles";

const Card = NativeTachyons.wrap(props => {
  const { borderRadius, children, shadow, styles } = props;
  return (
    <View
      style={{
        backgroundColor: "white",
        shadowOffset: { width: 0, height: 5 },
        shadowColor: shadow ? "black" : "transparent",
        borderColor: shadow ? "transparent" : Colors.nearWhite,
        borderWidth: 1,
        shadowOpacity: 0.5,
        elevation: 2,
        zIndex: 2,
        ...styles
      }}
      cls="pa3"
    >
      {children}
    </View>
  );
});

export default Card;
