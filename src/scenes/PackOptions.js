import React from "react";
import GuidePackOptions from "../components/Packs/GuidePackOptions";
import { ContainerFullScreenWithNavBarAngled } from "../components/common";

const PackOptions = props => (
  <ContainerFullScreenWithNavBarAngled
    backgroundColor="white"
    {...props}
    packTop
  >
    <GuidePackOptions />
  </ContainerFullScreenWithNavBarAngled>
);

export default PackOptions;
