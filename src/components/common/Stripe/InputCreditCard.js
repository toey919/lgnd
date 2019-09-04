import React from "react";
import { View, Text } from "react-native";
import { PaymentCardTextField } from "tipsi-stripe";

import { Colors, BorderRadius } from "../../../config/styles";

const InputCreditCard = props => {
  const { fontColor, borderRadius, borderColor, label, onCCChange } = props;
  return (
    <View>
      <Text
        style={{
          marginBottom: 15
        }}
      >
        {label}
      </Text>
      <PaymentCardTextField
        style={{
          color: fontColor ? Colors[fontColor] : Colors.primaryDeepGray,
          borderRadius: borderRadius
            ? BorderRadius[borderRadius].all
            : BorderRadius["medium"].all,
          borderColor: borderColor ? Colors[borderColor] : Colors.moonGray,
          paddingLeft: 10,
          paddingTop: 10,
          paddingBottom: 10,
          paddingRight: 10
        }}
        onParamsChange={onCCChange}
        onChange={onCCChange}
      />
    </View>
  );
};

export default InputCreditCard;
