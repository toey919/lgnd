import React from "react";
import { TouchableOpacity, Image, View } from "react-native";

const Avatar = props => {
  const { width, height, logo, onPress, borderRadius } = props;
  return onPress ? (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: width || 100,
        height: height || 100,
        alignSelf: "center"
      }}
    >
      <Image
        style={{
          flex: 1,
          borderRadius: 50
        }}
        resizeMode="cover"
        source={{ uri: logo }}
      />
    </TouchableOpacity>
  ) : (
    <Image
      style={{
        alignSelf: "center",
        width: width || 100,
        height: height || 100,
        borderRadius: borderRadius || 50
      }}
      resizeMode="cover"
      source={{ uri: logo }}
    />
  );
};
export default Avatar;
