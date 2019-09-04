import React from 'react';
import { View, Text } from 'react-native';
import NativeTachyons from "react-native-style-tachyons";
import { connect } from 'react-redux';
import { Colors } from '../../config/styles';
import { ModalTransparent } from '../common';
import { deleteAccount } from './ProfileActions';

const DeleteModal = NativeTachyons.wrap(({
  hideModal,
  deleteAccount
}) => (
  <ModalTransparent
    hideModal={hideModal}
    onButtonPress={() => { hideModal(); deleteAccount(); }}
    topContent="Delete Account"
    hideButton={false}
    buttonText="Delete"
    buttonColor={Colors.brandPrimary}
  >
    <View cls="pa3">
      <Text
        cls="tc f5 pv3"
        style={{ color: Colors.brandSecondary }}>
        Are you sure you want to permanently delete your account? This can not be undone.
      </Text>
    </View>
  </ModalTransparent>
));

export default connect(null, { deleteAccount })(DeleteModal);
