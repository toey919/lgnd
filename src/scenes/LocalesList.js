import React from "react";
import { Text } from "react-native";

import LocalesListView from "../components/Locales/LocalesListView";
import ContainerFullScreen from "../components/common/ContainerFullScreenWithNavBar";

const LocalesList = () => (
  <ContainerFullScreen>
    <LocalesListView />
  </ContainerFullScreen>
);

export default LocalesList;
