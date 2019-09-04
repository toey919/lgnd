import React from "react";
import { StatusBar } from "react-native";
import { ContainerFullScreenWithNavBar } from "../../components/common";

const CreateRequest = () => {
  StatusBar.setBarStyle("dark-content", true);

  return (
    <ContainerFullScreenWithNavBar
      backgroundColor="white"
      label="Create Request"
    />
  );
};

export default CreateRequest;
