import React from "react";
import { TextInput, View, Text } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import NativeTachyons from "react-native-style-tachyons";
import InputCreditCard from "./InputCreditCard";

import { Colors, BorderRadius } from "../../../config/styles";

const InputCreditCardUI = props => {
  const {
    inputInFocus,
    handleCreditCard,
    forceBlur,
    inputProps,
    onFocus,
    onBlur,
    input,
    forceFocus
  } = props;
  return (
    <View>
      {inputInFocus ? (
        <View cls="flx-row aic mb3 ba" style={styles.cardStyle}>
          <View style={{ width: "90%" }}>
            <InputCreditCard
              label="Credit Card"
              onCCChange={handleCreditCard}
            />
          </View>
          <View style={styles.featherParentStyle}>
            <Feather
              name="check"
              size={inputProps.size || 20}
              onPress={forceBlur}
              color={Colors.black}
              style={styles.featherIconStyle}
            />
          </View>
        </View>
      ) : (
        <View cls="flx-row aic mb3 ba" style={styles.cardStyle}>
          <View style={{ width: "90%" }}>
            <Text style={styles.labelStyle}>{inputProps.label}</Text>
            <TextInput
              keyboardType={inputProps.keyboardType || "default"}
              underlineColorAndroid="rgba(0,0,0,0)"
              autoCorrect={false}
              editable={inputInFocus}
              autoCapitalize="none"
              onChangeText={input.onChange}
              onFocus={onFocus}
              onBlur={onBlur}
              value={input.value || inputProps.initialValue}
              secureTextEntry={input.name === "password"}
              placeholder={inputProps.placeholder}
              style={styles.textInputStyle}
            />
          </View>
          <View style={styles.featherParentStyle}>
            <Feather
              name="edit-2"
              size={inputProps.size || 20}
              onPress={forceFocus}
              color={Colors.black}
              style={styles.featherIconStyle}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = {
  cardStyle: {
    flex: 1,
    borderRadius: BorderRadius["small"].all,
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

export default NativeTachyons.wrap(InputCreditCardUI);
