import React from "react";
import {
  ScrollView,
  View,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import NativeTachyons from "react-native-style-tachyons";
import { NavBarAngled } from "./";
import PackTop from "../Packs/PackTop";

const ContainerFullScreenWithNavBarAngled = NativeTachyons.wrap(props => {
  const {
    backgroundColor,
    label,
    backgroundBook,
    children,
    packDetail,
    guideDetail,
    packTop
  } = props;
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <NavBarAngled label={label} backgroundBook={backgroundBook} />
      {packTop && <PackTop {...props} />}
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-start" }}
        style={{ flex: 1, backgroundColor: backgroundColor || "white" }}
        keyboardShouldPersistTaps={"always"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View cls="pa3">{children}</View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </View>
  );
});

export default ContainerFullScreenWithNavBarAngled;
