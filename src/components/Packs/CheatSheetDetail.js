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
import { AccordionItem } from "../common";
import { Colors } from "../../config/styles";
import { fetchPackCheatSheets } from "./PackActions";
import PackTop from "./PackTop";

class CheatSheetDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  formatLink(linkUrl) {
    if (linkUrl && linkUrl.substring(0, 4) !== "http") {
      return `https://${linkUrl}`;
    }
    return linkUrl;
  }

  renderLink(url) {
    return (
      <TouchableOpacity
        style={{ marginVertical: 10 }}
        onPress={() => Linking.openURL(this.formatLink(url))}
      >
        <Text style={styles.accordionLinkStyle}>{url}</Text>
      </TouchableOpacity>
    );
  }

  renderAddress(address) {
    const formatAddress = address ? address.split(/[ ,]+/).join("+") : "";
    return (
      <TouchableOpacity
        onPress={() => Linking.openURL(`maps://app?daddr=${formatAddress}`)}
      >
        <Text style={styles.accordionLinkStyle}>{address}</Text>
      </TouchableOpacity>
    );
  }

  renderSheetItem(cheatSheet, index) {
    const name = cheatSheet.get("name") || "";
    const description = cheatSheet.get("description") || "";
    const address = cheatSheet.get("address") || "";
    const website = cheatSheet.get("website") || "";
    return this.state[`showAccordian${index}`] ? (
      <AccordionItem
        onPress={() => this.setState({ [`showAccordian${index}`]: false })}
        key={cheatSheet.id}
        borderRadius={0}
        borderWidth={2}
        icon="chevron-up"
        index={index}
        borderColor={Colors.brandSecondary}
        iconColor={Colors.gray}
      >
        <View style={styles.listTextStyle}>
          <Text style={styles.accordionTitleStyle}>{name}</Text>
          {address.length > 0 && this.renderAddress(address)}
          {website.length > 0 && this.renderLink(website)}
          <Text style={styles.accordionTextStyle}>{description || ""}</Text>
        </View>
      </AccordionItem>
    ) : (
      <AccordionItem
        onPress={() => this.setState({ [`showAccordian${index}`]: true })}
        key={cheatSheet.id}
        borderRadius={0}
        borderWidth={2}
        index={index}
        borderColor={Colors.brandSecondary}
        iconColor={Colors.gray}
      >
        <View style={styles.listTextStyle}>
          <Text style={styles.accordionTitleStyle}>{name || ""}</Text>
        </View>
      </AccordionItem>
    );
  }

  renderCheatSheets() {
    if (this.props.cheatSheets && this.props.cheatSheets.length > 0) {
      return this.props.cheatSheets.map((sheet, i) =>
        this.renderSheetItem(sheet, i)
      );
    }
    return (
      <View>
        <Text style={styles.textStyle}>
          Looks like this guide has not added any recommendations for this
          category! Contact LGND support if you think this is a mistake.
        </Text>
      </View>
    );
  }
  renderCheatSheetType(type) {
    if (type === "barsNightlife") {
      return "BARS & NIGHTLIFE";
    }
    if (type === "thingsToDo") {
      return "THINGS TO DO";
    }
    if (type === "thingsToKnow") {
      return "THINGS TO KNOW";
    }
    return type.toUpperCase();
  }
  render() {
    const { matchedGuide, matchedPack, cheatSheetType } = this.props;
    const location = matchedPack ? matchedPack.get("location") : "";
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.rowStyle} onPress={() => Actions.pop()}>
          <Feather name="chevron-left" size={25} color={Colors.brandPrimary} />
          <Text style={styles.titleStyle}>BACK</Text>
        </TouchableOpacity>
        <View style={styles.paddingStyle}>
          <Text style={styles.titleStyle}>
            {this.renderCheatSheetType(cheatSheetType)}
          </Text>
          {this.renderCheatSheets()}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginTop: -10
  },
  paddingStyle: {
    paddingHorizontal: 20
  },
  locationText: {
    textAlign: "left"
  },
  rowStyle: {
    flexDirection: "row",
    alignItems: "flex-start"
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20
  },
  titleStyle: {
    color: Colors.brandPrimary,
    fontSize: 20,
    textAlign: "left",
    marginBottom: 20
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
  listItemStyle: {
    flexDirection: "column",
    marginBottom: 20,
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
  },
  audioText: {
    textAlign: "center",
    color: Colors.gray,
    fontSize: 14,
    marginTop: 10
  },
  cheatSheetText: {
    textAlign: "center",
    color: Colors.white,
    fontSize: 14
  },
  audioListStyle: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10
  },
  boxStyle: {
    width: "50%",
    padding: 5
  },
  textStyle: {
    color: Colors.gray,
    fontSize: 18,
    fontWeight: "400",
    textAlign: "left",
    paddingVertical: 10
  },
  accordionTextStyle: {
    color: Colors.gray,
    fontSize: 14,
    textAlign: "left",
    paddingBottom: 5
  },
  accordionTitleStyle: {
    color: Colors.gray,
    fontSize: 14,
    textAlign: "left",
    paddingBottom: 5,
    fontWeight: "bold"
  },
  accordionLinkStyle: {
    color: Colors.brandSecondary,
    fontSize: 14,
    textAlign: "left",
    paddingBottom: 5
  }
});

const mapStateToProps = ({ PackReducer }) => {
  const { matchedGuide, matchedPack, packCheatSheets } = PackReducer;
  return {
    matchedGuide,
    matchedPack,
    packCheatSheets
  };
};

export default connect(
  mapStateToProps,
  { fetchPackCheatSheets }
)(CheatSheetDetail);
