import React from "react";
import { View, StatusBar } from "react-native";
import { ContainerFullScreen } from "../components/common";
import CreateProfileForm from "../components/Profile/CreateProfileForm";

const CreateProfile = () => {
  StatusBar.setBarStyle("dark-content", true);

  return (
    <ContainerFullScreen backgroundColor="white">
      <View style={{ flex: 1, justifyContent: "center" }}>
        <CreateProfileForm />
      </View>
    </ContainerFullScreen>
  );
};

export default CreateProfile;
