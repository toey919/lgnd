import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import Feather from "react-native-vector-icons/Feather";
import { Player } from "@react-native-community/audio-toolkit";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Slider,
  ScrollView
} from "react-native";
import { Button, Avatar, BorderedBox, Spinner } from "../common";
import { Colors } from "../../config/styles";
import { fetchPackCheatSheets } from "./PackActions";

class AudioDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      progress: 0,
      audioPrepped: false
    };
    this.lastSeek = 0;

    this.player = new Player(this.props.audioFile.audio._url);
    this.playAudio = this.playAudio.bind(this);
    this.pauseAudio = this.pauseAudio.bind(this);
    this.player.prepare(err => {
      this.setState({ audioPrepped: true });
    });
    this._progressInterval = setInterval(() => {
      if (
        this.state.audioPrepped &&
        this.state.isPlaying &&
        this.player &&
        this._shouldUpdateProgressBar()
      ) {
        this.setState({
          progress: Math.max(0, this.player.currentTime) / this.player.duration
        });
      }
    }, 100);
  }
  componentWillUnmount() {
    this.player.destroy();
  }
  fancyTimeFormat(time) {
    // Hours, minutes and seconds
    const mins = ~~((time % 3600) / 60);
    const secs = time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    let ret = "";

    ret += `${mins}:${secs < 10 ? "0" : ""}`;
    ret += `${secs}`;
    return ret;
  }
  _seek(percentage) {
    if (!this.player) {
      return;
    }
    this.lastSeek = Date.now();
    const position = percentage * this.player.duration;
    this.player.seek(position, () => {
      // this.setState({ position });
    });
  }

  _shouldUpdateProgressBar() {
    // Debounce progress bar update by 200 ms
    return Date.now() - this.lastSeek > 200;
  }

  playAudio() {
    if (this.state.audioPrepped) {
      this.player.play(() => {
        this.setState({ isPlaying: true });
      });
    }
  }
  pauseAudio() {
    this.player.playPause((err, playing) => {
      if (err) {
        this.setState({
          error: err.message
        });
      }
      this.setState({ isPlaying: false });
    });
  }

  renderPlayPause() {
    return this.state.isPlaying ? (
      <TouchableOpacity onPress={this.pauseAudio}>
        <Feather name="pause-circle" size={40} color={Colors.brandSecondary} />
      </TouchableOpacity>
    ) : (
      <TouchableOpacity onPress={this.playAudio}>
        <Feather name="play-circle" size={40} color={Colors.brandSecondary} />
      </TouchableOpacity>
    );
  }

  renderAudioPlayer(audioFile) {
    return (
      <BorderedBox
        borderColor={Colors.brandSecondary}
        styles={{ marginVertical: 20, height: 100 }}
      >
        <View style={styles.playerStyle}>
          <View style={styles.leftPlayerStyle}>
            {this.state.audioPrepped ? this.renderPlayPause() : <Spinner />}
          </View>
          <View style={styles.rightPlayerStyle}>
            <View style={styles.slider}>
              <Slider
                step={0.0001}
                style={styles.sliderStyle}
                thumbTintColor={Colors.brandSecondary}
                minimumTrackTintColor={Colors.brandSecondary}
                onSlidingComplete={() => console.log("complete")}
                onValueChange={percentage => this._seek(percentage)}
                value={this.state.progress}
              />
            </View>
            <View style={styles.rightBottomStyle}>
              <Text style={styles.timerStyle}>
                {this.fancyTimeFormat(
                  Math.round((this.player.currentTime || 0) / 1000)
                )}
              </Text>
              <Text style={styles.timerStyle}>
                -
                {this.fancyTimeFormat(
                  Math.round(
                    this.player.duration / 1000 -
                      (this.player.currentTime || 0) / 1000
                  )
                )}
              </Text>
            </View>
          </View>
        </View>
      </BorderedBox>
    );
  }
  renderAudio() {
    const { audioFile } = this.props;
    return (
      <View style={styles.listItemStyle}>
        <View style={styles.topContainer}>
          <TouchableOpacity
            style={styles.rowStyle}
            onPress={() => Actions.pop()}
          >
            <Feather
              name="chevron-left"
              size={25}
              color={Colors.brandPrimary}
            />
            <Text style={styles.titleStyle}>BACK</Text>
          </TouchableOpacity>
          <Text style={styles.titleStyle}>AUDIO</Text>
        </View>
        {this.renderAudioPlayer(audioFile)}
        <ScrollView>
          <Text style={styles.titleStyle}>{audioFile.audioName}</Text>
          <Text style={styles.textStyle}>{audioFile.audioDescription}</Text>
        </ScrollView>
      </View>
    );
  }

  render() {
    return <View style={styles.container}>{this.renderAudio()}</View>;
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
    marginBottom: 20
  },
  rowStyle: {
    flexDirection: "row",
    alignItems: "center"
  },
  titleStyle: {
    color: Colors.brandPrimary,
    fontSize: 20,
    textAlign: "left",
    fontWeight: "bold"
  },
  subTitle: {
    color: Colors.gray,
    fontSize: 14,
    textAlign: "right"
  },
  timerStyle: {
    color: Colors.gray,
    fontSize: 12,
    margin: 0,
    padding: 0
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
  playerStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 10
  },
  leftPlayerStyle: {},
  rightPlayerStyle: {
    flexDirection: "column",
    justifyContent: "center",
    width: "75%",
    position: "relative"
  },
  rightBottomStyle: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  slider: {
    height: 30
  },
  sliderStyle: {
    height: 30,
    marginLeft: 5
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
)(AudioDetail);
