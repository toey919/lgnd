import React from "react";

import AudioDetail from "../components/Packs/AudioDetail";
import { ContainerFullScreenFixedWithNavBarAngled } from "../components/common";

const AudioDetails = props => (
  <ContainerFullScreenFixedWithNavBarAngled
    backgroundColor="white"
    packTop
    {...props}
  >
    <AudioDetail audioFile={props.audioFile} {...props} />
  </ContainerFullScreenFixedWithNavBarAngled>
);

export default AudioDetails;
