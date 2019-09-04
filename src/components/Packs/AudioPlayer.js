import React, { Component } from "react";

import {
  AlertIOS,
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Player, MediaStates } from "react-native-audio-toolkit";

class AudioPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prepareAudio: false
    };
    this.player = new Player(
      "https://lgnd.s3.amazonaws.com/462a50070b5898e4f1f647704ce4f032_file.wav"
    );
    this.playAudio = this.playAudio.bind(this);
  }
  componentWillUnmount() {
    console.log("unclicked");
  }

  playAudio() {
    this.setState({ prepareAudio: true });
    this.player.prepare(err => {
      const seconds = Math.round(this.player.duration / 1000); // duration is in milliseconds
      this.setState({ totalTime: seconds });
    });
    this.player.play(() => {
      this.setState({ isPlaying: true, prepareAudio: false });
    });
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.playAudio}>
          <Text>{this.state.prepareAudio ? "Buffering..." : "Play"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.player.pause()}>
          <Text>Pause</Text>
        </TouchableOpacity>
        {this.state.totalTime && <Text>{this.state.totalTime}</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    height: 500
  },
  fullScreen: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  controls: {
    backgroundColor: "transparent",
    borderRadius: 5,
    position: "absolute",
    bottom: 44,
    left: 4,
    right: 4
  },
  progress: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 3,
    overflow: "hidden"
  },
  innerProgressCompleted: {
    height: 20,
    backgroundColor: "#cccccc"
  },
  innerProgressRemaining: {
    height: 20,
    backgroundColor: "#2C2C2C"
  },
  generalControls: {
    flex: 1,
    flexDirection: "row",
    overflow: "hidden",
    paddingBottom: 10
  },
  skinControl: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  rateControl: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  volumeControl: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  resizeModeControl: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  ignoreSilentSwitchControl: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  controlOption: {
    alignSelf: "center",
    fontSize: 11,
    color: "white",
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 12
  },
  nativeVideoControls: {
    top: 184,
    height: 300
  }
});

export default AudioPlayer;
