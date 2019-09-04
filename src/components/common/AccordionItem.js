import React from "react";
import { TouchableOpacity, View } from "react-native";
import NativeTachyons from "react-native-style-tachyons";
import Feather from "react-native-vector-icons/Feather";

import { Colors } from "../../config/styles";

const AccordionItem = NativeTachyons.wrap(props => {
  const {
    borderWidth,
    borderColor,
    borderRadius,
    onPress,
    children,
    cardPadding,
    style,
    iconColor,
    index
  } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={
        style || {
          borderWidth: borderWidth || 1,
          borderTopWidth: index === 0 ? 2 : 0,
          padding: cardPadding || 10,
          borderRadius: borderRadius || 0,
          backgroundColor: "white",
          borderColor: borderColor || "transparent",
          elevation: 1,
          zIndex: 2
        }
      }
      cls="flx-row jcsb"
    >
      {children}
      <View>
        <Feather
          name={props.icon || "chevron-down"}
          size={props.size || 20}
          color={iconColor || Colors.brandDeepGray}
          style={{
            position: "absolute",
            right: 5
          }}
        />
      </View>
    </TouchableOpacity>
  );
});

export default AccordionItem;
