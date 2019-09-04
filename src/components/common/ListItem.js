import React from "react";
import { TouchableOpacity } from "react-native";
import NativeTachyons from "react-native-style-tachyons";
import Feather from "react-native-vector-icons/Feather";

import { Colors } from "../../config/styles";

const ListItem = NativeTachyons.wrap(props => {
  const {
    borderWidth,
    borderColor,
    borderRadius,
    onPress,
    children,
    cardPadding,
    style,
    noShadow,
    iconColor
  } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={
        style || {
          borderWidth: borderWidth || 1,
          padding: cardPadding || 10,
          borderRadius: borderRadius || 0,
          backgroundColor: "white",
          shadowOffset: { width: 0, height: 5 },
          shadowColor: noShadow ? "transparent" : Colors.moonGray,
          borderColor: borderColor || "transparent",
          shadowOpacity: 0.5,
          elevation: 1,
          zIndex: 2
        }
      }
      cls="flx-row aic mb3 jcsb"
    >
      {children}
      <Feather
        name={props.icon || "chevron-right"}
        size={props.size || 30}
        color={iconColor || Colors.brandDeepGray}
        style={{}}
      />
    </TouchableOpacity>
  );
});

export default ListItem;
