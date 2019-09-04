import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { Text, View, StyleSheet } from "react-native";
import { Button, ListItem, Spinner } from "../common";
import { Colors } from "../../config/styles";
import { fetchMyPacks, routeToPack } from "./PackActions";

class MyPacksList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.props.fetchMyPacks();
  }

  renderPacks() {
    if (this.props.myPacks.length > 0) {
      return this.props.myPacks.map(pack => {
        const packName = pack.get("packName");
        const location = pack.get("location");
        const guide = pack.get("guide");
        if (guide && location) {
          const name = guide.get("name");
          const city = location ? location.get("city") : "";
          const state = location ? location.get("state") : "";
          return (
            <ListItem
              onPress={() => this.props.routeToPack(pack, guide)}
              key={pack.id}
              borderRadius={0}
              borderWidth={2}
              noShadow
              borderColor={Colors.brandSecondary}
              iconColor={Colors.brandSecondary}
            >
              <View style={styles.listTextStyle}>
                <Text
                  style={styles.upperTextStyle}
                >{`${city}, ${state} LGND Pack`}</Text>
                <Text
                  style={styles.lowerTextStyle}
                >{`Prepared by ${name}`}</Text>
              </View>
            </ListItem>
          );
        }
        return <View key={pack.id} />;
      });
    }
    return (
      <Text style={styles.textStyle}>
        You do not have any packs. Choose "Find More Packs" to be matched with a
        guide and tour their city!
      </Text>
    );
  }

  render() {
    const { myPacks } = this.props;
    return (
      <View style={styles.container}>
        {myPacks ? this.renderPacks() : <Spinner style={styles.spinnerStyle} />}
        {myPacks && (
          <Button
            onPress={() => Actions.LocalesList()}
            fontColor="white"
            fontSize={18}
            smallPadding
            buttonColor={Colors.brandSecondary}
          >
            Find More Packs
          </Button>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column"
  },
  listTextStyle: {
    flexDirection: "column"
  },
  upperTextStyle: {
    fontSize: 16,
    textAlign: "left",
    marginBottom: 5
  },
  lowerTextStyle: {
    color: Colors.gray,
    fontSize: 14,
    textAlign: "left",
    marginBottom: 0
  },
  spinnerStyle: {
    marginBottom: 30
  },
  textStyle: {
    color: Colors.gray,
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center",
    marginVertical: 40
  }
});

const mapStateToProps = ({ PackReducer }) => {
  const { matchedGuide, matchedPack, myPacks } = PackReducer;
  return {
    matchedGuide,
    matchedPack,
    myPacks
  };
};

export default connect(
  mapStateToProps,
  { fetchMyPacks, routeToPack }
)(MyPacksList);
