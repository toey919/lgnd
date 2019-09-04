import React from "react";
import { StyleSheet } from "react-native";
import { Scene, Router, Actions } from "react-native-router-flux";

import { TabIcon } from "./components/common";
import SignIn from "./scenes/SignIn";
import SignUp from "./scenes/SignUp";
import ForgotPassword from "./scenes/ForgotPassword";
// client scenes
import CreateProfile from "./scenes/CreateProfile";

import GetStarted from "./scenes/GetStarted";
import LocalesList from "./scenes/LocalesList";
import Survey from "./scenes/Survey";
import MyPacks from "./scenes/MyPacks";
import EditProfile from "./scenes/EditProfile";
import MyGuide from "./scenes/MyGuide";
import PackDetails from "./scenes/PackDetails";
import AudioDetails from "./scenes/AudioDetails";
import CheatSheetDetails from "./scenes/CheatSheetDetails";
import PackOptions from "./scenes/PackOptions";
import NoPacks from "./scenes/NoPacks";
import LaunchLogo from "./scenes/LaunchLogo";

import { Colors } from "./config/styles";

const RouterComponent = () => (
  <Router>
    <Scene key="root">
      <Scene key="LaunchLogo" hideNavBar initial component={LaunchLogo} />
      <Scene key="SignIn" hideNavBar component={SignIn} />
      <Scene hideNavBar key="CreateProfile" component={CreateProfile} />
      <Scene hideNavBar key="SignUp" component={SignUp} />
      <Scene hideNavBar key="ForgotPassword" component={ForgotPassword} />
      <Scene key="AudioDetails" component={AudioDetails} hideNavBar />
      <Scene
        key="NavTabBar"
        tabs
        tabBarPosition="bottom"
        tabBarStyle={styles.tabBarStyle}
        tabStyle={styles.tabStyle}
        showIcon
        showLabel={false}
        hideNavBar
      >
        <Scene
          initial
          key="Locales"
          title="Locales"
          iconTitle="globe"
          icon={TabIcon}
          tabBarOnPress={() => {
            Actions.LocalesList();
          }}
        >
          <Scene key="LocalesList" component={LocalesList} hideNavBar initial />
          <Scene key="GetStarted" component={GetStarted} hideNavBar />
          <Scene key="Survey" component={Survey} hideNavBar />
          <Scene key="NoPacks" component={NoPacks} hideNavBar />
          <Scene key="MyGuide" component={MyGuide} hideNavBar />
          <Scene key="PackOptions" component={PackOptions} hideNavBar />
        </Scene>
        <Scene
          key="MyPacks"
          title="My Packs"
          iconTitle="folder"
          hideNavBar
          icon={TabIcon}
          tabBarOnPress={() => {
            Actions.MyPacksList();
          }}
        >
          <Scene initial key="MyPacksList" component={MyPacks} hideNavBar />
          <Scene key="PackDetails" component={PackDetails} hideNavBar />
          <Scene
            key="CheatSheetDetails"
            component={CheatSheetDetails}
            hideNavBar
          />
        </Scene>
        <Scene
          key="Profile"
          title="Profile"
          iconTitle="user"
          hideNavBar
          icon={TabIcon}
          component={EditProfile}
        />
      </Scene>
    </Scene>
  </Router>
);
const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: Colors.nearWhite,
    height: 70
  },
  titleStyle: {
    fontSize: 18,
    color: Colors.black,
    fontWeight: "300",
    zIndex: 100
  },
  buttonStyle: {
    tintColor: Colors.brandPrimary,
    color: Colors.brandPrimary
  },
  tabStyle: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 20
  },
  indicatorStyle: {
    backgroundColor: Colors.brandPrimary
  }
});

export default RouterComponent;
