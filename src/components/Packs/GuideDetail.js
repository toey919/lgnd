import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import Feather from "react-native-vector-icons/Feather";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Linking
} from "react-native";
import { Button, Avatar } from "../common";
import { Colors } from "../../config/styles";

class GuideDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleLink(url) {
    if (url.substring(0, 4) !== "http") {
      url = `https://${url}`;
    }
    Linking.openURL(url).catch(err => console.error("An error occurred", err));
  }

  render() {
    const { matchedGuide, matchedPack } = this.props;
    const name = matchedGuide ? matchedGuide.get("name") : "";
    const profession = matchedGuide ? matchedGuide.get("profession") : "";
    const travelLikes = matchedGuide ? matchedGuide.get("traveLikes") : "";
    const travelDislikes = matchedGuide
      ? matchedGuide.get("travelDislikes")
      : "";
    const travelPhilosophy = matchedGuide
      ? matchedGuide.get("travelPhilosophy")
      : "";
    const profilePhoto = matchedGuide ? matchedGuide.get("profilePhoto") : "";
    const instagram = matchedGuide ? matchedGuide.get("instagram") : "";
    const facebook = matchedGuide ? matchedGuide.get("facebook") : "";
    const twitter = matchedGuide ? matchedGuide.get("twitter") : "";
    const location = matchedPack ? matchedPack.get("location") : "";
    const city = location ? location.get("city") : "";
    const state = location ? location.get("state") : "";
    return (
      <View style={styles.container}>
        <Text style={styles.title}>MEET YOUR LGND GUIDE</Text>
        <Avatar
          width={150}
          height={150}
          borderRadius={75}
          logo={
            profilePhoto && profilePhoto._url
              ? profilePhoto._url
              : "https://lgnd-backend-qa.herokuapp.com/parse/files/lgnd-backend-qa/adea4bc2ee2a8a59df33988b3344dd7b_image.png"
          }
        />
        <Text style={styles.centerText}>{name}</Text>
        {(instagram || facebook || twitter) && (
          <View style={styles.iconRow}>
            {instagram && (
              <TouchableOpacity onPress={() => this.handleLink(instagram)}>
                <Feather
                  name="instagram"
                  size={24}
                  color={Colors.brandPrimary}
                />
              </TouchableOpacity>
            )}
            {twitter && (
              <TouchableOpacity onPress={() => this.handleLink(twitter)}>
                <Feather
                  name="twitter"
                  size={24}
                  style={styles.iconPadding}
                  color={Colors.brandPrimary}
                />
              </TouchableOpacity>
            )}
            {facebook && (
              <TouchableOpacity onPress={() => this.handleLink(facebook)}>
                <Feather
                  name="facebook"
                  size={24}
                  color={Colors.brandPrimary}
                />
              </TouchableOpacity>
            )}
          </View>
        )}
        <Text style={styles.purpleText}>
          Lives In: <Text style={styles.textStyle}>{`${city}, ${state}`}</Text>
        </Text>
        <Text style={styles.purpleText}>
          Profession: <Text style={styles.textStyle}>{profession}</Text>
        </Text>
        <Text style={styles.purpleText}>
          Travel Likes: <Text style={styles.textStyle}>{travelLikes}</Text>
        </Text>
        <Text style={styles.purpleText}>
          Travel Dislikes:{" "}
          <Text style={styles.textStyle}>{travelDislikes}</Text>
        </Text>
        <Text style={styles.purpleText}>
          Travel Philosophy:{" "}
          <Text style={styles.textStyle}>{travelPhilosophy}</Text>
        </Text>
        <Button
          fontSize={20}
          smallPadding
          onPress={() =>
            Actions.PackOptions({
              packDetail: matchedPack,
              guideDetail: matchedGuide
            })
          }
        >
          VIEW AVAILABLE PACKS
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    paddingHorizontal: 20
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15
  },
  iconPadding: {
    paddingLeft: 10,
    paddingRight: 5
  },
  title: {
    color: Colors.brandPrimary,
    fontSize: 24,
    textAlign: "center",
    marginBottom: 15
  },
  centerText: {
    color: Colors.brandPrimary,
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 15
  },
  purpleText: {
    color: Colors.brandSecondary,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "left",
    marginBottom: 15
  },
  textStyle: {
    color: Colors.gray,
    fontSize: 18,
    fontWeight: "400",
    textAlign: "left"
  }
});

const mapStateToProps = ({ PackReducer }) => {
  const { matchedGuide, matchedPack } = PackReducer;
  return {
    matchedGuide,
    matchedPack
  };
};

export default connect(
  mapStateToProps,
  {}
)(GuideDetail);
