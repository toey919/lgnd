import React from "react";
import { Field } from "redux-form";
import { InputGooglePlaces } from "../";

const AddressField = props => (
  <Field
    name="address"
    label="Address"
    component={InputGooglePlaces}
    onRowPress={address => {
      props.change("address", { address });
    }}
  />
);

export default AddressField;
