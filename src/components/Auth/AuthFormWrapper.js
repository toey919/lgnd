import React from 'react';
import { Field } from 'redux-form';
import { View, Text } from 'react-native';

import { Colors } from '../../config/styles';
import { InputWithIcon, Button, Spinner } from '../common';

const AuthFormWrapper = ({
  loading,
  authError,
  error,
  anyTouched,
  onPress,
  buttonColor,
  buttonText,
}) => (
  <View style={{ marginTop: 10, marginBottom: 10 }}>
    <Field
      name="email"
      component={InputWithIcon}
      keyboardType="email-address"
      icon="user"
      placeholder="Email address"
    />
    <Field
      name="password"
      component={InputWithIcon}
      icon="lock"
      placeholder="Password"
    />
    {loading ? (
      <Spinner />
    ) : (
      <Button
        onPress={onPress}
        smallPadding
        fontSize={18}
        buttonColor={buttonColor}
      >
        {buttonText}
      </Button>
    )}
    {authError && !error && (
      <Text
        style={{ textAlign: 'center', color: Colors.darkRed, marginTop: 5 }}
      >
        {authError}
      </Text>
    )}
    {error && anyTouched && (
      <Text
        style={{ textAlign: 'center', color: Colors.darkRed, marginTop: 5 }}
      >
        {error}
      </Text>
    )}
  </View>
);
export default AuthFormWrapper;
