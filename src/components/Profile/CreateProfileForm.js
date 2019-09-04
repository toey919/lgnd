import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { View, Text, Linking } from "react-native";

import { updateProfile } from "./ProfileActions";
import {
  InputBottomBorder,
  Button,
  Spinner,
  InputGooglePlaces
} from "../common";
import Required from "../../helpers/required";

import { Colors } from "../../config/styles";

const RenderText = props => (
  <Text
    style={{
      fontSize: 14,
      color: Colors.brandPrimary,
      textAlign: "center",
      marginTop: props.marginTop || 0,
      marginBottom: props.marginBottom || 0
    }}
  >
    {props.children}
  </Text>
);

const RenderLink = props => (
  <Text
    style={{
      fontSize: 14,
      color: Colors.moonGray,
      marginBottom: 5,
      textAlign: "center"
    }}
    onPress={() => Linking.openURL(props.url)}
  >
    {props.children}
  </Text>
);

class CreateProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.submit = this.submit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.goToNext = this.goToNext.bind(this);
  }

  async submit(values) {
    this.props.updateProfile(values, true);
  }
  onChange() {
    console.log("changing");
  }
  goToNext() {
    this.secondTextInput.focus();
  }

  render() {
    // TODO: put this in a helper function and export it
    const { handleSubmit, error, anyTouched, profileLoading } = this.props;
    return (
      <View
        style={{
          marginBottom: 40,
          marginLeft: 10,
          marginRight: 10,
          marginTop: 30
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: Colors.brandPrimary,
            marginBottom: 40,
            fontSize: 30
          }}
        >
          CREATE AN ACCOUNT
        </Text>
        <View
          style={{
            marginLeft: 15,
            marginRight: 15,
            marginTop: 40
          }}
        >
          <Field
            name="name"
            onEnter={() => {
              this.age.getRenderedComponent().refs.age.focus();
            }}
            component={InputBottomBorder}
            autoCapitalize="words"
            fontColor={Colors.brandPrimary}
            validate={Required}
            placeholder="Full Name"
            textAlign
          />
          <Field
            name="age"
            withRef
            ref={componentRef => (this.age = componentRef)}
            refField="age"
            component={InputBottomBorder}
            keyboardType="numeric"
            fontColor={Colors.brandPrimary}
            validate={Required}
            placeholder="Age"
            textAlign
          />
          <Field
            name="cityState"
            label="Current City"
            component={InputGooglePlaces}
            onChange={this.onChange}
          />
          {error && anyTouched && (
            <Text
              style={{
                textAlign: "center",
                color: Colors.darkRed,
                marginTop: 5
              }}
            >
              {error}
            </Text>
          )}
          <View
            style={{
              marginTop: 30,
              paddingLeft: 35,
              paddingRight: 35,
              marginBottom: 50
            }}
          >
            <RenderText>
              By clicking Get Started, you acknowledge you have read and agree
              to our
            </RenderText>
            <RenderLink url="http://lgndapp.com/tos">
              Terms & Conditions
            </RenderLink>
          </View>
          {profileLoading ? (
            <Spinner />
          ) : (
            <Button
              fontSize={20}
              fontWeight="400"
              borderRadius={0}
              buttonColor={Colors.brandPrimary}
              onPress={handleSubmit(this.submit)}
            >
              GET STARTED
            </Button>
          )}
        </View>
      </View>
    );
  }
}

const validate = values => {
  const errors = {};
  if (!values.name || !values.age || !values.cityState) {
    errors._error = "*All fields are required";
  }
  return errors;
};
const mapStateToProps = ({ ProfileReducer }) => {
  const { profileLoading } = ProfileReducer;
  return {
    profileLoading
  };
};

export default reduxForm({
  form: "createProfile",
  validate
})(
  connect(
    mapStateToProps,
    {
      updateProfile
    }
  )(CreateProfileForm)
);
