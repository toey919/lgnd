import React from "react";

import PackDetail from "../components/Packs/PackDetail";
import { ContainerFullScreenWithNavBarAngled } from "../components/common";

const PackDetails = props => (
  <ContainerFullScreenWithNavBarAngled
    {...props}
    backgroundColor="white"
    packTop
  >
    <PackDetail />
  </ContainerFullScreenWithNavBarAngled>
);

export default PackDetails;
