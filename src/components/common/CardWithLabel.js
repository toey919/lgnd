import React from "react";
import { View, Text } from "react-native";
import NativeTachyons from "react-native-style-tachyons";

import { BorderRadius, Colors } from "../../config/styles";

const CardWithLabel = NativeTachyons.wrap(
  ({ borderRadius, topContent, children, shadow, borderColor }) => (
    <View
      style={{
        borderRadius: borderRadius
          ? BorderRadius[borderRadius]
          : BorderRadius["small"].all,
        backgroundColor: "white",
        shadowOffset: { width: 0, height: 5 },
        shadowColor: shadow ? Colors.moonGray : "transparent",
        borderColor: borderColor || "transparent",
        borderWidth: 1,
        shadowOpacity: 0.5,
        elevation: 1,
        zIndex: 2,
        marginVertical: 10
      }}
    >
      <View
        cls="aic jcsb pa2"
        style={{
          borderBottomWidth: 1,
          borderBottomColor: Colors.moonGray
        }}
      >
        <Text cls="tc b">{topContent}</Text>
      </View>
      <View>
        <View cls="flx-i aic jcc h4">
          <Text cls="f2" style={{ color: Colors.brandPrimary }}>
            {children}
          </Text>
        </View>
      </View>
    </View>
  )
);

export default CardWithLabel;
