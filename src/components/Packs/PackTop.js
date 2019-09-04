import React from "react";
import Feather from "react-native-vector-icons/Feather";
import { Text, View, StyleSheet, Linking } from "react-native";
import { Avatar } from "../common";
import { Colors } from "../../config/styles";

const formatLink = linkUrl => {
  if (linkUrl && linkUrl.substring(0, 4) !== "http") {
    return `https://${linkUrl}`;
  }
  return linkUrl;
};
const PackTop = props => {
  const { guideDetail } = props;
  const name = guideDetail.get("name");
  const profilePhoto = guideDetail.get("profilePhoto");
  const location = guideDetail.get("location");
  const city = location ? location.get("city") : "";
  const state = location ? location.get("state") : "";
  const facebook = guideDetail.get("facebook") || "";
  const instagram = guideDetail.get("instagram") || "";
  const twitter = guideDetail.get("twitter") || "";
  return (
    <View style={styles.topContainer}>
      <Avatar
        logo={
          profilePhoto && profilePhoto._url
            ? profilePhoto._url
            : "https://lgnd-backend-qa.herokuapp.com/parse/files/lgnd-backend-qa/adea4bc2ee2a8a59df33988b3344dd7b_image.png"
        }
      />
      <View>
        <Text style={styles.titleStyle}>{`${city || ""}${
          city && state ? "," : ""
        } ${state || ""}`}</Text>
        <Text style={styles.subTitle}>{`Created by: ${name}`}</Text>
        <View style={styles.iconRow}>
          {instagram.length > 0 && (
            <Feather
              onPress={() => Linking.openURL(formatLink(instagram))}
              name="instagram"
              size={20}
              color={Colors.brandPrimary}
              style={{
                paddingHorizontal: 7
              }}
            />
          )}
          {twitter.length > 0 && (
            <Feather
              onPress={() => Linking.openURL(formatLink(twitter))}
              name="twitter"
              size={20}
              color={Colors.brandPrimary}
              style={{
                paddingHorizontal: 7
              }}
            />
          )}
          {facebook.length > 0 && (
            <Feather
              onPress={() => Linking.openURL(formatLink(facebook))}
              name="facebook"
              size={20}
              color={Colors.brandPrimary}
              style={{
                paddingHorizontal: 7
              }}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default PackTop;

const styles = StyleSheet.create({
  locationText: {
    textAlign: "left"
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: -40,
    justifyContent: "space-between",
    marginBottom: 20,
    backgroundColor: "transparent",
    padding: 10
  },
  titleStyle: {
    color: Colors.brandPrimary,
    fontSize: 20,
    textAlign: "left"
  },
  subTitle: {
    color: Colors.gray,
    marginTop: 7,
    marginBottom: 7,
    fontSize: 14,
    textAlign: "right"
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});
