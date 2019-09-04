import React, { Component } from "react";
import { TouchableOpacity, Image, View, Text } from "react-native";
import ImagePicker from "react-native-image-picker";
import Feather from "react-native-vector-icons/Feather";

import { Colors } from "../../../config/styles";
import Spinner from "../Spinner";

class AvatarPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preview: null,
      loading: false
    };
    this.submitImage = this.submitImage.bind(this);
    this.renderImagePicker = this.renderImagePicker.bind(this);
  }

  async submitImage(imageObj) {
    const profileImage = new Parse.File(imageObj.fileName, {
      base64: imageObj.data
    });
    try {
      const savedImage = await profileImage.save();
      this.props.setAvatarImage(savedImage["_url"]);
      this.setState({ preview: savedImage["_url"], loading: false });
    } catch (err) {
      console.log("error!", err);
      this.setState({ loading: false });
    }
  }
  getPhoto() {
    this.setState({ loading: true });
    const options = {
      title: "Select Profile Picture",
      quality: 0.5,
      maxWidth: 300,
      maxHeight: 300,
      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        this.setState({ loading: false });
      } else if (response.error) {
        this.setState({ loading: false });
      } else if (response.customButton) {
        this.setState({ loading: false });
      } else {
        this.submitImage(response);
      }
    });
  }

  renderImagePicker() {
    if (this.state.preview) {
      return (
        <Image
          style={{
            flex: 1
          }}
          resizeMode="cover"
          source={{ uri: this.state.preview }}
        />
      );
    }
    if (this.props.initialImage) {
      return (
        <Image
          style={{
            flex: 1
          }}
          resizeMode="cover"
          source={{ uri: this.props.initialImage }}
        />
      );
    }
    return (
      <View
        style={{
          width: 100,
          height: 100,
          backgroundColor: Colors.silver,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Feather name="user" size={40} color="white" />
      </View>
    );
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.getPhoto()}>
        <View
          style={{
            width: 100,
            height: 100,
            overflow: "hidden",
            borderRadius: 50,
            alignSelf: "center"
          }}
        >
          {this.state.loading ? <Spinner /> : this.renderImagePicker()}
        </View>
        {!this.state.preview && (
          <Text
            style={{
              marginTop: 10,
              textAlign: "center"
            }}
          >
            {this.props.photoText || "Profile Image"}
          </Text>
        )}
      </TouchableOpacity>
    );
  }
}
export default AvatarPicker;
