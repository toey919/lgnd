import React from "react";
import { StatusBar } from "react-native";
import { ContainerFullScreenWithNavBarAngled } from "../components/common";
import EditProfileForm from "../components/Profile/EditProfileForm";

const ClientCreateProfile = () => {
  StatusBar.setBarStyle("dark-content", true);

  return (
    <ContainerFullScreenWithNavBarAngled
      backgroundColor="white"
      label="My Profile"
    >
      <EditProfileForm />
    </ContainerFullScreenWithNavBarAngled>
  );
};

export default ClientCreateProfile;
