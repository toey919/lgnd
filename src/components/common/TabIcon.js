import React from "react";
import { View, Text } from "react-native";
import Feather from "react-native-vector-icons/Feather";

import { Colors } from "../../config/styles";

const TabIcon = ({ focused, iconTitle, title }) => (
  <View
    style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    <Feather
      name={iconTitle}
      size={24}
      color={focused ? Colors.brandSecondary : Colors.darkGrey}
    />
    <Text
      style={{
        color: focused ? Colors.brandSecondary : Colors.darkGrey,
        fontSize: 10,
        marginTop: 3
      }}
    >
      {title}
    </Text>
  </View>
);

export default TabIcon;
