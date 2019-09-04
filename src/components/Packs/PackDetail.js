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
import { Button, Spinner, BorderedBox } from "../common";
import { Colors } from "../../config/styles";
import { fetchPackCheatSheets, removePack } from "./PackActions";
import PackTop from "./PackTop";

class PackDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.fetchPackCheatSheets(this.props.matchedPack);
  }

  renderAudioFile(audioFile, index) {
    const { matchedGuide, matchedPack } = this.props;
    return (
      <View style={styles.boxStyle} key={`${audioFile.audio.name}${index}`}>
        <BorderedBox borderColor={Colors.brandSecondary}>
          <TouchableOpacity
            onPress={() =>
              Actions.AudioDetails({
                audioFile,
                matchedGuide,
                matchedPack,
                hi: "hi",
                guideDetail: matchedGuide,
                packDetail: matchedPack
              })
            }
          >
            <Feather
              name="play-circle"
              size={40}
              color={Colors.brandSecondary}
            />
          </TouchableOpacity>
          <Text style={styles.audioText}>{audioFile.audioName}</Text>
        </BorderedBox>
      </View>
    );
  }
  renderAudio() {
    const { matchedPack } = this.props;
    const audio = matchedPack ? matchedPack.get("audio") : "";
    return (
      <View style={styles.listItemStyle}>
        <Text style={styles.titleStyle}>AUDIO</Text>
        <View style={styles.audioListStyle}>
          {audio.map((audioFile, i) => this.renderAudioFile(audioFile, i))}
        </View>
      </View>
    );
  }

  filterCheatSheets(cheatSheets, type) {
    const filteredSheets = cheatSheets.filter(cheatSheet => {
      const sheetType = cheatSheet.get("type");
      return sheetType == type;
    });
    return filteredSheets;
  }
  renderCheatSheets() {
    const { packCheatSheets, matchedGuide, matchedPack } = this.props;
    return (
      <View style={styles.listItemStyle}>
        <Text style={styles.titleStyle}>CHEAT SHEETS</Text>
        {packCheatSheets && (
          <View style={styles.audioListStyle}>
            <TouchableOpacity
              style={styles.boxStyle}
              onPress={() =>
                Actions.CheatSheetDetails({
                  guideDetail: matchedGuide,
                  packDetail: matchedPack,
                  cheatSheetType: "restaurants",
                  cheatSheets: this.filterCheatSheets(
                    packCheatSheets,
                    "restaurants"
                  )
                })
              }
            >
              <BorderedBox
                borderColor={Colors.brandSecondary}
                backgroundColor={Colors.brandSecondary}
                styles={{ height: 50 }}
              >
                <Text style={styles.cheatSheetText}>RESTAURANTS</Text>
              </BorderedBox>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.boxStyle}
              onPress={() =>
                Actions.CheatSheetDetails({
                  guideDetail: matchedGuide,
                  packDetail: matchedPack,
                  cheatSheetType: "barsNightlife",
                  cheatSheets: this.filterCheatSheets(
                    packCheatSheets,
                    "barsNightlife"
                  )
                })
              }
            >
              <BorderedBox
                borderColor={Colors.brandSecondary}
                backgroundColor={Colors.brandSecondary}
                styles={{ height: 50 }}
              >
                <Text style={styles.cheatSheetText}>BARS & NIGHTLIFE</Text>
              </BorderedBox>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.boxStyle}
              onPress={() =>
                Actions.CheatSheetDetails({
                  guideDetail: matchedGuide,
                  packDetail: matchedPack,
                  cheatSheetType: "thingsToDo",
                  cheatSheets: this.filterCheatSheets(
                    packCheatSheets,
                    "thingsToDo"
                  )
                })
              }
            >
              <BorderedBox
                borderColor={Colors.brandSecondary}
                backgroundColor={Colors.brandSecondary}
                styles={{ height: 50 }}
              >
                <Text style={styles.cheatSheetText}>THINGS TO DO</Text>
              </BorderedBox>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.boxStyle}
              onPress={() =>
                Actions.CheatSheetDetails({
                  guideDetail: matchedGuide,
                  packDetail: matchedPack,
                  cheatSheetType: "thingsToKnow",
                  cheatSheets: this.filterCheatSheets(
                    packCheatSheets,
                    "thingsToKnow"
                  )
                })
              }
            >
              <BorderedBox
                borderColor={Colors.brandSecondary}
                backgroundColor={Colors.brandSecondary}
                styles={{ height: 50 }}
              >
                <Text style={styles.cheatSheetText}>THINGS TO KNOW</Text>
              </BorderedBox>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
  render() {
    const { packLoading, matchedPack } = this.props;
    const audio = matchedPack ? matchedPack.get("audio") : "";
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.rowStyle} onPress={() => Actions.pop()}>
          <Feather name="chevron-left" size={25} color={Colors.brandPrimary} />
          <Text style={styles.titleStyle}>BACK</Text>
        </TouchableOpacity>
        <View style={styles.paddingStyle}>
          {audio && this.renderAudio()}
          {this.renderCheatSheets()}
          <View style={styles.iconRow} />
          {packLoading ? (
            <Spinner />
          ) : (
            <Button
              style={{
                marginTop: 10,
                marginBottom: 30,
                flex: 1,
                borderColor: Colors.brandSecondary,
                borderWidth: 1
              }}
              fontColor={Colors.brandSecondary}
              buttonColor={Colors.white}
              onPress={() => this.props.removePack(matchedPack.id)}
            >
              Remove Pack from My Packs
            </Button>
          )}
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
    fontWeight: "bold"
  },
  rowStyle: {
    flexDirection: "row",
    alignItems: "flex-start",
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
  }
});

const mapStateToProps = ({ PackReducer }) => {
  const {
    matchedGuide,
    matchedPack,
    packCheatSheets,
    packLoading
  } = PackReducer;
  return {
    matchedGuide,
    matchedPack,
    packCheatSheets,
    packLoading
  };
};

export default connect(
  mapStateToProps,
  { fetchPackCheatSheets, removePack }
)(PackDetail);
