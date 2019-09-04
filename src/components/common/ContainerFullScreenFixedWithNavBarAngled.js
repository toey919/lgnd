import React from "react";
import { ScrollView, View } from "react-native";
import NativeTachyons from "react-native-style-tachyons";
import { NavBarAngled } from "./";
import PackTop from "../Packs/PackTop";

const ContainerFullScreenFixedWithNavBarAngled = NativeTachyons.wrap(props => {
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
      <View
        contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-start" }}
        style={{ flex: 1, backgroundColor: backgroundColor || "white" }}
      >
        <View cls="pa3">{children}</View>
      </View>
    </View>
  );
});

export default ContainerFullScreenFixedWithNavBarAngled;
