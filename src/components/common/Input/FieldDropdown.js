import React, { Component } from "react";
import { connect } from "react-redux";
import { Field } from "redux-form";
import { View, Picker } from "react-native";

import { Colors } from "../../../config/styles";
import InputPicker from "./InputPicker";
import InputDropdown from "./InputDropdown";

class FieldDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPicker: false
    };
  }
  render() {
    const { pickerValues, fieldName, fieldValue, formatValue } = this.props;
    return (
      <View style={{ paddingTop: 20, backgroundColor: Colors.white }}>
        {this.state.showPicker ? (
          <Field
            name={fieldName}
            component={InputPicker}
            iosHeader="Select one"
            mode="dropdown"
            style={{ marginTop: -20 }}
            hidePicker={() => {
              this.setState({ showPicker: false });
            }}
          >
            {Object.keys(pickerValues).map(val => (
              <Picker.Item
                label={formatValue(val, pickerValues)}
                value={val}
                key={val}
              />
            ))}
          </Field>
        ) : (
          <InputDropdown
            icon="chevron-down"
            value={formatValue(fieldValue, pickerValues)}
            size={25}
            onPress={() => this.setState({ showPicker: true })}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { createProfileLoading } = state.CreateProfileReducer;
  return {
    createProfileLoading
  };
};

export default connect(
  mapStateToProps,
  null
)(FieldDropdown);
