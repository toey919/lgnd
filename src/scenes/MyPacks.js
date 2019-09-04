import React from "react";
import MyPacksList from "../components/Packs/MyPacksList";

import { ContainerFullScreenWithNavBarAngled } from "../components/common";

const MyPacks = () => (
  <ContainerFullScreenWithNavBarAngled
    backgroundColor="white"
    label="MY PACKS"
    backgroundBook
  >
    <MyPacksList />
  </ContainerFullScreenWithNavBarAngled>
);

export default MyPacks;
