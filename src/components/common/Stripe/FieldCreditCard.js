import React from "react";
import { Field } from "redux-form";
import { InputCreditCard } from "../";

const FieldCreditCard = props => (
  <Field
    name="creditCard"
    label="Credit Card"
    component={InputCreditCard}
    onCCChange={(valid, values) =>
      props.change("creditCard", { valid, values })
    }
  />
);

export default FieldCreditCard;
