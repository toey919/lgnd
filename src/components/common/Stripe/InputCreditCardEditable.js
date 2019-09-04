import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import InputCreditCardUI from "./InputCreditCardUI";

// TODO: point path to your updateUserCreditCard function
import { updateUserCreditCard } from "../../Profile/ProfileActions";

// TODO: add STRIPE_PUBLISHABLE_KEY to config
import { STRIPE_PUBLISHABLE_KEY } from "../../../config/globals";

class CreditCardInputEditable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputInFocus: false
    };
    this.forceFocus = this.forceFocus.bind(this);
    this.forceBlur = this.forceBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCreditCard = this.handleCreditCard.bind(this);
  }

  forceFocus() {
    this.setState({ inputInFocus: true });
  }

  forceBlur() {
    this.setState({ inputInFocus: false }, () =>
      this.handleSubmit(this.props.input)
    );
  }

  handleCreditCard(valid, values) {
    if (valid) {
      this.setState({
        valid,
        values
      });
    }
  }

  async handleSubmit() {
    try {
      if (this.state.valid) {
        const token = await this.getStripeToken(this.state.values);
        this.props.updateUserCreditCard(token);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getStripeToken(params) {
    const { number, expMonth, expYear, cvc } = params;
    const res = await fetch(
      `https://api.stripe.com/v1/tokens?card[number]=${number}&card[exp_month]=${expMonth}&card[exp_year]=${expYear}&card[cvc]=${cvc}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`
        }
      }
    );
    const json = await res.json();
    return json.id;
  }

  render() {
    const { input, ...inputProps } = this.props;
    return (
      <View>
        <InputCreditCardUI
          handleFocus={() => {
            this.setState({ inputInFocus: true });
          }}
          forceBlur={this.forceBlur}
          onBlur={() => this.setState({ inputInFocus: false })}
          onFocus={() => {
            this.setState({ inputInFocus: true });
          }}
          forceFocus={this.forceFocus}
          inputProps={inputProps}
          input={input}
          handleCreditCard={this.handleCreditCard}
          inputInFocus={this.state.inputInFocus}
        />
      </View>
    );
  }
}

export default connect(
  null,
  { updateUserCreditCard }
)(CreditCardInputEditable);
