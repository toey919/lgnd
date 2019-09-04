import React, { Component } from "react";
import { connect } from "react-redux";
import Feather from "react-native-vector-icons/Feather";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "../common";
import { Colors } from "../../config/styles";
import { routeToPack, routeAddPack } from "../Packs/PackActions";

class GuidePackOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  renderPackBox() {
    return (
      <View style={styles.listItemStyle}>
        <View style={styles.topListStyle}>
          <View style={styles.topListLeft}>
            <Feather
              name="chevron-right"
              size={24}
              color={Colors.brandPrimary}
            />
            <Text style={styles.titleStyle}>LGND PACK</Text>
          </View>
          <Button
            fontColor={Colors.brandPrimary}
            buttonColor={Colors.white}
            smallButton
            onPress={() =>
              this.props.routeAddPack(
                this.props.matchedPack,
                this.props.matchedGuide
              )
            }
            style={styles.buttonStyle}
          >
            SELECT
          </Button>
        </View>
        <Text style={styles.textStyle}>
          Get travel tips from someone just like you, vetted by our local
          experts. This pack features cheatsheets, audio guides, and other
          resources to make your trip awesome.
        </Text>
      </View>
    );
  }
  renderProBox() {
    return (
      <View style={styles.proItemStyle}>
        <View style={styles.topListStyle}>
          <View style={styles.topListLeft}>
            <Feather
              name="chevron-right"
              size={24}
              color={Colors.brandPrimary}
            />
            <Text style={styles.titleStyle}>LGND PACK PRO</Text>
          </View>
          <Button
            fontColor={Colors.brandPrimary}
            buttonColor="rgba(183, 166, 119, 0.3)"
            smallButton
            style={styles.buttonStyle}
          >
            COMING SOON
          </Button>
        </View>
      </View>
    );
  }
  renderVipBox() {
    return (
      <View style={styles.proItemStyle}>
        <View style={styles.topListStyle}>
          <View style={styles.topListLeft}>
            <Feather
              name="chevron-right"
              size={24}
              color={Colors.brandPrimary}
            />
            <Text style={styles.titleStyle}>LGND PACK VIP</Text>
          </View>
          <Button
            fontColor={Colors.brandPrimary}
            buttonColor="rgba(183, 166, 119, 0.3)"
            smallButton
            style={styles.buttonStyle}
          >
            COMING SOON
          </Button>
        </View>
      </View>
    );
  }
  render() {
    const { matchedGuide, matchedPack } = this.props;
    const name = matchedGuide ? matchedGuide.get("name") : "";
    const profilePhoto = matchedGuide ? matchedGuide.get("profilePhoto") : "";
    const location = matchedPack ? matchedPack.get("location") : "";
    const city = location ? location.get("city") : "";
    const state = location ? location.get("state") : "";
    return (
      <View style={styles.container}>
        {this.renderPackBox()}
        {this.renderProBox()}
        {this.renderVipBox()}
        <View style={styles.iconRow} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginTop: -10
  },
  locationText: {
    textAlign: "left"
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 50
  },
  iconPadding: {
    paddingLeft: 10,
    paddingRight: 5
  },
  titleStyle: {
    color: Colors.brandPrimary,
    fontSize: 18,
    textAlign: "right"
  },
  subTitle: {
    color: Colors.gray,
    fontSize: 14,
    textAlign: "right"
  },
  titleTop: {
    color: Colors.brandPrimary,
    fontSize: 26,
    textAlign: "center",
    marginBottom: 0
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
    textAlign: "left",
    padding: 10
  },
  listItemStyle: {
    flexDirection: "column",
    padding: 20,
    marginHorizontal: -15,
    borderTopWidth: 1,
    borderTopColor: Colors.brandPrimary
  },
  proItemStyle: {
    flexDirection: "column",
    padding: 20,
    marginHorizontal: -15,
    borderTopWidth: 1,
    backgroundColor: "rgba(183, 166, 119, 0.3)",
    borderTopColor: Colors.brandPrimary
  },
  topListStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  topListLeft: {
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  buttonStyle: {
    borderColor: Colors.brandPrimary,
    borderWidth: 1,
    padding: 0,
    margin: 0
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
  { routeToPack, routeAddPack }
)(GuidePackOptions);
