import React, { Component } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Animated,
  Keyboard,
  Dimensions,
  TouchableWithoutFeedback
} from "react-native";
import { Colors } from "../../config/styles";

class ContainerFullScreen extends Component {
  constructor(props) {
    super(props);
    this.keyboardHeight = new Animated.Value(0);
    this.containerHeight = 0;
    this.containerY = 0;
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
    const { height: windowHeight } = Dimensions.get("window");
    const moveH =
      event.endCoordinates.height -
      (windowHeight - (this.containerY + this.containerHeight));
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: moveH > 0 ? -moveH : 0
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

  render() {
    return (
      <Animated.View
        style={[
          {
            flex: 1,
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0
          },
          { transform: [{ translateY: this.keyboardHeight }] }
        ]}
      >
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          style={{
            flex: 1,
            backgroundColor: Colors[this.props.backgroundColor] || "white"
          }}
          keyboardShouldPersistTaps={"always"}
        >
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <View
              style={styles.childContainer}
              onLayout={event => {
                // console.warn(event.nativeEvent.layout);
                this.containerHeight = event.nativeEvent.layout.height;
                this.containerY = event.nativeEvent.layout.y;
              }}
            >
              {this.props.children}
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  childContainer: {
    padding: 20,
    paddingBottom: 0
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center"
  }
});
export default ContainerFullScreen;
