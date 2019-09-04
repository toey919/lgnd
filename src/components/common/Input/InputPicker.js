import React from "react";
import { Picker } from "react-native";

const InputPicker = ({
  style,
  input: { onChange, value, ...inputProps },
  children,
  hidePicker,
  ...pickerProps
}) => (
  <Picker
    selectedValue={value}
    style={style}
    onValueChange={value => {
      onChange(value);
      hidePicker();
    }}
    {...inputProps}
    {...pickerProps}
  >
    {children}
  </Picker>
);

export default InputPicker;
