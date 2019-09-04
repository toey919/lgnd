import React from "react";
import { View, Text, StyleSheet, Modal } from "react-native";
import NativeTachyons from "react-native-style-tachyons";
import Icon from "react-native-vector-icons/Feather";
import { Colors, BorderRadius } from "../../config/styles";
import { Button, ContainerFullScreen, Spinner } from "../common";

const ModalTransparent = NativeTachyons.wrap(
  ({
    borderRadius,
    topContent,
    hideModal,
    children,
    onButtonPress,
    hideButton
  }) => (
    <Modal
      style={styles.modalStyle}
      transparent
      onRequestClose={() => {
        console.log("closed");
      }}
    >
      <ContainerFullScreen
        backgroundColor="transparentGrey"
        style={styles.containerStyle}
      >
        <View
          style={{
            borderRadius: borderRadius
              ? BorderRadius[borderRadius]
              : BorderRadius["small"].all,
            backgroundColor: "white",
            alignSelf: "center",
            elevation: 1,
            zIndex: 2,
            marginVertical: 10,
            width: "90%"
          }}
        >
          <View cls="aic jcc pa3" style={styles.topContainerStyle}>
            <Text cls="tc" style={{ color: Colors.brandPrimary }}>
              {topContent}
            </Text>
            <Icon
              onPress={() => hideModal()}
              size={15}
              name="x"
              color={Colors.moonGray}
              style={styles.iconStyle}
            />
          </View>
          {children}
          <View cls="pv3 ph2 jcc" style={styles.bottomContainerStyle}>
            {!hideButton ? (
              <View style={styles.buttonContainerStyle}>
                <Button
                  style={styles.buttonStyle}
                  onPress={hideModal}
                  fontSize={16}
                  smallPadding
                  buttonColor={Colors.moonGray}
                >
                  Cancel
                </Button>
                <Button
                  style={styles.buttonStyle}
                  onPress={onButtonPress}
                  fontSize={16}
                  smallPadding
                  buttonColor={Colors.brandSecondary}
                >
                  Delete
                </Button>
              </View>
            ) : (
              <Spinner size="small" />
            )}
          </View>
        </View>
      </ContainerFullScreen>
    </Modal>
  )
);

const styles = Object.freeze({
  modalStyle: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    flex: 1,
    ...StyleSheet.absoluteFillObject
  },
  containerStyle: {
    backgroundColor: Colors.transparentGrey,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonContainerStyle: {
    display: "flex",
    flexDirection: "row"
  },
  buttonStyle: {
    flex: 1,
    marginHorizontal: 5
  },
  topContainerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.moonGray
  },
  bottomContainerStyle: {
    borderTopWidth: 1,
    borderTopColor: Colors.moonGray
  },
  iconStyle: {
    position: "absolute",
    right: 10
  }
});

export default ModalTransparent;
