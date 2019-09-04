import React from "react";

import CheatSheetDetail from "../components/Packs/CheatSheetDetail";
import { ContainerFullScreenWithNavBarAngled } from "../components/common";

const CheatSheetDetails = props => (
  <ContainerFullScreenWithNavBarAngled
    backgroundColor="white"
    {...props}
    packTop
  >
    <CheatSheetDetail {...props} />
  </ContainerFullScreenWithNavBarAngled>
);

export default CheatSheetDetails;
