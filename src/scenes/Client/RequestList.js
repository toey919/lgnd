import React from "react";
import { StatusBar } from "react-native";
import { ContainerFullScreenWithNavBar } from "../../components/common";

const RequestList = () => {
  StatusBar.setBarStyle("dark-content", true);

  return (
    <ContainerFullScreenWithNavBar
      backgroundColor="white"
      label="My Requests"
    />
  );
};

export default RequestList;
