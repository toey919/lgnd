import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { Button, InputRadio, Spinner } from '../common';
import { submitSurvey } from './SurveyActions';
import { Colors } from '../../config/styles';

class SurveyForm extends Component {
  constructor(props) {
    super(props);
    this.state = { };
    this.submit = this.submit.bind(this);
  }

  handleMultiSelectPress(selected, category) {
    this.setState({ [category]: selected });
  }
  submit(values) {
    this.props.submitSurvey(values, this.props.selectedLocale);
  }

  render() {
    const {
      handleSubmit, error, anyTouched
    } = this.props;
    return (
      <View style={styles.container}>
        <Field
          component={InputRadio}
          question="What is your age range?"
          name="ageRange"
          radios={[{ label: '18-25', value: '18-25' },
            { label: '26-33', value: '26-33' },
            { label: '34-41', value: '34-41' },
            { label: '42+', value: '42+' }]} />
        <Field
          component={InputRadio}
          question="What type of trip are you taking?"
          name="travelType"
          radios={[
            { label: 'Solo Travel (Pleasure)', value: 1 },
            { label: 'Solo Travel (Business)', value: 2 },
            { label: 'Romantic Getaway', value: 3 },
            { label: 'Party Weekend with Friends', value: 4 },
            { label: 'Food & Beverage Focused', value: 5 },
            { label: 'Adventure Seeking', value: 6 },
            { label: 'Cultural & Historical Immersion', value: 7 },
            { label: 'Family Vacation', value: 8 },
                ]} />
        <Field
          question="How would you describe your budget?"
          component={InputRadio}
          name="budgetType"
          radios={[
            { label: 'I have a smaller budget', value: 1 },
            { label: 'I can splurge on a few things', value: 2 },
            { label: 'I like to treat myself when traveling', value: 3 },
          ]} />
        <Field
          question="How active would you like to be on your trip?"
          component={InputRadio}
          name="activityLevel"
          radios={[
            { label: 'This trip is all about relaxing', value: 1 },
            { label: 'I want a mix of activities and some relaxation', value: 2 },
            { label: 'I want to experience as much as possible', value: 3 },
          ]} />
        <Field
          question="How often do you travel (for work or pleasure)?"
          component={InputRadio}
          name="travelerStyle"
          radios={[
            { label: 'Not Often (1-2 trips per year)', value: 1 },
            { label: 'Occasionally (3-4 trips per year)', value: 2 },
            { label: 'Regularly (5-10 trips per year)', value: 3 },
            { label: 'Extensively (11+ trips per year)', value: 4 },
          ]} />
        <Field
          question="How adventurous are you when it comes to travel?"
          component={InputRadio}
          name="travelStyle"
          radios={[
            { label: 'I tend to stay inside my comfort zone', value: 1 },
            { label: 'I can be persuaded to be a little adventurous', value: 2 },
            { label: 'My middle name is Adventure', value: 3 }
            ]} />
        {error && anyTouched && <Text style={{ textAlign: 'center', color: Colors.darkRed, marginTop: 5 }}>{error}</Text>}
        {this.props.surveyLoading ? <Spinner /> : <Button smallPadding style={{ marginTop: 40, marginBottom: 20 }} fontSirc cze={20} onPress={handleSubmit(this.submit)}>SUBMIT</Button>}
      </View>
    );
  }
}
const validate = (values) => {
  const errors = {};
  if (!values.ageRange || !values.travelType || !values.budgetType || !values.activityLevel || !values.travelerStyle || !values.travelStyle) {
    errors._error = '*All fields are required';
  }
  return errors;
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    padding: 10,
    flex: 1
  },
  text: {
    color: Colors.gray,
    marginBottom: 15,
    marginTop: 15,
    fontSize: 18
  },
});

const mapStateToProps = ({ SurveyReducer, LocaleReducer }) => {
  const { surveyLoading, surveyError } = SurveyReducer;
  const { selectedLocale } = LocaleReducer;
  return {
    surveyLoading,
    selectedLocale,
    surveyError
  };
};
export default reduxForm({
  form: 'surveyFrom',
  validate
})(connect(mapStateToProps, {
  submitSurvey
})(SurveyForm));
