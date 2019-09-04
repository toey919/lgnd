import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { View, Text, Linking } from 'react-native';

import { InputEditable, Spinner, Button, InputGooglePlacesEditable } from '../common';
import { signOutUser } from '../Auth/AuthActions';
import { updateProfile } from './ProfileActions';
import DeleteModal from './DeleteModal';
import { Colors } from '../../config/styles';


const RenderText = props => (
  <Text style={{
      fontSize: 14,
      color: props.color || Colors.moonGray,
      textAlign: 'center',
      marginTop: props.marginTop || 0,
      marginBottom: props.marginBottom || 0,
      paddingBottom: 0,
      ...props.style
  }}>
    {props.children}
  </Text>
);

const RenderLink = props => (
  <Text
    style={{
      fontSize: 14,
      fontWeight: 'bold',
      color: props.color ? props.color : Colors.brandSecondary,
      marginTop: props.marginTop ? props.marginTop : 0,
      marginRight: props.marginRight ? props.marginRight : 0,
      textAlign: 'center',
      marginBottom: 30,
      paddingTop: 0,
    }}
    onPress={() => Linking.openURL(props.link ? props.link : 'http://google.com')}>
    {props.children}
  </Text>
);

class EditProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDeleteModal: false
    };
    this.handleTextFieldUpdate = this.handleTextFieldUpdate.bind(this);
    this.onCityStateChange = this.onCityStateChange.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  hideModal() {
    this.setState({ showDeleteModal: false });
  }
  handleTextFieldUpdate({ value, name }) {
    this.props.updateProfile({ [name]: value });
  }
  onCityStateChange(value) {
    this.props.updateProfile({ cityState: value });
  }
  render() {
    const {
      error, anyTouched, deleteProfileLoading, user, signOutUser
    } = this.props;
    return (
      <View>
        {this.state.showDeleteModal && (<DeleteModal hideModal={this.hideModal} />)}
        {user &&
          <View>
            <Field
              style={{ marginTop: 10 }}
              name="name"
              label="FULL NAME"
              autoCapitalize="words"
              component={InputEditable}
              textAlign
              initialValue={user.attributes.name}
              handleSubmit={this.handleTextFieldUpdate}
            />
            <Field
              name="email"
              label="EMAIL"
              component={InputEditable}
              textAlign
              initialValue={user.attributes.email}
              handleSubmit={this.handleTextFieldUpdate}
            />
            <Field
              name="age"
              label="AGE"
              component={InputEditable}
              textAlign
              initialValue={user.attributes.age}
              handleSubmit={this.handleTextFieldUpdate}
            />
            <Field
              name="cityState"
              label="CURRENT CITY"
              component={InputGooglePlacesEditable}
              textAlign
              onChange={this.onCityStateChange}
              initialValue={user.attributes.cityState}
            />
            <Button style={{
             flex: 1,
             marginBottom: 40
            }}
              fontColor="white"
              buttonColor={Colors.brandSecondary}
              onPress={() => signOutUser()}>Log Out
            </Button>
            {error && anyTouched &&
              <Text
                style={{
                 textAlign: 'center',
                 color: Colors.darkRed,
                 marginTop: 5,
                 marginBottom: 5
               }}>{error}
              </Text>}
              {deleteProfileLoading ?
                <Spinner /> :
                <Button style={{
                     marginTop: 10,
                     marginBottom: 30,
                     flex: 1,
                     borderColor: Colors.brandSecondary,
                     borderWidth: 1,
                    }}
                  fontColor={Colors.brandSecondary}
                  buttonColor={Colors.white}
                  onPress={() => this.setState({ showDeleteModal: true })}>Delete Account
                </Button>
              }
            <View style={{ paddingLeft: 30, paddingRight: 30 }}>
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <RenderLink link="http://lgndapp.com/tos" marginRight={5}>
                    Terms of Service  |
                </RenderLink>
                <RenderLink link="http://lgndapp.com/privacy">
                      Privacy Policy
                </RenderLink>
              </View>
              <RenderText style={{ flex: 1 }}>
Have questions about LGND? Visit us at:
              </RenderText>
              <RenderLink link="http://lgndapp.com/faq">LGND.com/faq</RenderLink>
              <RenderText style={{ flex: 1 }}>
              Want to become a LGND guide?
              </RenderText>
              <RenderLink link="http://lgndapp.com/become-a-lgnd-guide">Apply Now</RenderLink>
            </View>
          </View>
        }
      </View>
    );
  }
}


const validate = (values) => {
  const errors = {};
  if (values.phone && values.phone.length < 10) {
    errors._error = 'Phone number must contain 10 digits';
  }
  return errors;
};
const mapStateToProps = ({ ProfileReducer, UserReducer }) => {
  const { profileLoading, deleteProfileLoading } = ProfileReducer;
  const { user } = UserReducer;
  return {
    profileLoading,
    deleteProfileLoading,
    user
  };
};

export default reduxForm({
  form: 'editProfile',
  validate
})(connect(mapStateToProps, {
  updateProfile,
  signOutUser
})(EditProfileForm));
