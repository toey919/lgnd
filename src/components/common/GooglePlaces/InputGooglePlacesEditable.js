import React, { Component } from "react";
import { View, Text, Modal, Platform, Animated, Keyboard } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Feather from "react-native-vector-icons/Feather";
import NativeTachyons from "react-native-style-tachyons";
import Button from "../Button";

import { GOOGLE_PLACES_KEY } from "../../../config/globals";
import { Colors, BorderRadius } from "../../../config/styles";

export default NativeTachyons.wrap(
  class InputGooglePlacesEditable extends Component {
    constructor(props) {
      super(props);
      this.state = {
        inputInFocus: false,
        modalVisible: false
      };
      this.onRowPress = this.onRowPress.bind(this);
      this.keyboardHeight = new Animated.Value(0);
    }
    componentWillMount() {
      this.keyboardWillShowSub = Keyboard.addListener(
        "keyboardWillShow",
        this.keyboardWillShow
      );
      this.keyboardWillHideSub = Keyboard.addListener(
        "keyboardWillHide",
        this.keyboardWillHide
      );
    }
    componentWillUnmount() {
      this.keyboardWillShowSub.remove();
      this.keyboardWillHideSub.remove();
    }

    keyboardWillShow = event => {
      Animated.parallel([
        Animated.timing(this.keyboardHeight, {
          duration: event.duration,
          toValue: event.endCoordinates.height
        })
      ]).start();
    };
    keyboardWillHide = event => {
      Animated.parallel([
        Animated.timing(this.keyboardHeight, {
          duration: event.duration,
          toValue: 0
        })
      ]).start();
    };

    onRowPress(e) {
      const { input } = this.props;
      const { value } = this.googleRef.props;
      input.onChange(value);
      // this.props.onRowPress(e, this.googleRef.props.value);
      this.setState({ modalVisible: false });
    }

    render() {
      const {
        locationAutocompleteStyle,
        cardStyle,
        labelStyle,
        featherIconStyle,
        textInputStyle,
        featherParentStyle
      } = styles;
      return (
        <View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              this.setState({ modalVisible: false, textEntered: false });
            }}
          >
            <Animated.View style={{ marginBottom: this.keyboardHeight }}>
              <GooglePlacesAutocomplete
                placeholder="City"
                minLength={2}
                autoFocus
                returnKeyType="search"
                listViewDisplayed="auto"
                fetchDetails
                textInputProps={{
                  ref: r => {
                    if (r) this.googleRef = r;
                  }
                }}
                renderDescription={row => row.description}
                onPress={(data, details = null) => {
                  this.onRowPress(details);
                }}
                query={{
                  key: GOOGLE_PLACES_KEY,
                  language: "en",
                  types: "(cities)"
                }}
                styles={locationAutocompleteStyle}
                currentLocation={false}
                currentLocationLabel="Current location"
                nearbyPlacesAPI="GooglePlacesSearch"
                filterReverseGeocodingByTypes={[
                  "locality",
                  "administrative_area_level_3"
                ]}
                debounce={200}
              />
              <Button
                style={{
                  width: 100,
                  margin: 10,
                  marginTop: 50,
                  alignSelf: "flex-end"
                }}
                smallPadding
                fontColor={Colors.nearWhite}
                border
                borderColor={Colors.nearWhite}
                onPress={() =>
                  this.setState({ modalVisible: false, textEntered: false })
                }
              >
                Cancel
              </Button>
            </Animated.View>
          </Modal>
          <View cls="flx-row mb3 ba" style={cardStyle}>
            <View style={{ width: "90%" }}>
              <Text style={styles.labelStyle}>Current City</Text>
              <Text numberOfLines={1} style={textInputStyle}>
                {this.props.initialValue}
              </Text>
            </View>
            <View style={featherParentStyle}>
              <Feather
                name="edit-2"
                size={20}
                onPress={() => this.setState({ modalVisible: true })}
                color={Colors.moonGray}
                style={featherIconStyle}
              />
            </View>
          </View>
        </View>
      );
    }
  }
);

const styles = {
  locationAutocompleteStyle: {
    container: {
      zIndex: 10,
      overflow: "visible",
      marginTop: Platform.OS === "ios" ? 20 : 0
    },
    textInputContainer: {
      backgroundColor: "rgba(0,0,0,0)",
      borderRadius: BorderRadius["medium"].all,
      borderTopWidth: 0,
      borderBottomWidth: 0
    },
    textInput: {
      marginLeft: 10,
      marginRight: 10,
      borderRadius: BorderRadius["medium"].all,
      borderColor: Colors.nearWhite,
      color: Colors.primaryDeepGrey,
      backgroundColor: "white",
      borderWidth: 1,
      height: 37
    },
    listView: {
      position: "absolute",
      top: 60,
      left: 10,
      right: 10,
      backgroundColor: "white",
      borderRadius: 5,
      flex: 1,
      elevation: 10,
      zIndex: 10
    },
    description: {
      color: "#1faadb"
    },
    predefinedPlacesDescription: {
      color: "#1faadb"
    }
  },
  cardStyle: {
    flex: 1,
    borderColor: Colors.moonGray,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 15,
    paddingBottom: 15,
    justifyContent: "space-between"
  },
  featherParentStyle: {
    alignSelf: "flex-end",
    width: "10%",
    display: "flex"
  },
  featherIconStyle: {
    width: 20,
    height: 20,
    alignSelf: "flex-end"
  },
  textInputStyle: {
    color: Colors.primaryDeepGrey
  },
  labelStyle: {
    fontSize: 14,
    color: Colors.silver,
    marginBottom: 10
  }
};
