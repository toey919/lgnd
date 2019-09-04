import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button, InputMultiSelect } from '../common';

import { Colors } from '../../config/styles';

class SurveyView extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  handleMultiSelectPress(selected, category) {
    this.setState({ [category]: selected });
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>What is your age range?</Text>
          <InputMultiSelect
            onPress={s => this.handleMultiSelectPress(s, 'age')}
            selected={this.state.age}
            options={['18-28', '26-33', '34-41', '42+']} />
        </View>
        <View>
          <Text style={styles.text}>What type of trip are you taking?</Text>
          <InputMultiSelect
            onPress={s => this.handleMultiSelectPress(s, 'age')}
            selected={this.state.age}
            options={[
              '18-28',
              '26-33',
              '34-41',
              '42+'
            ]} />
        </View>
        <Button smallPadding fontSirc cze={20}>SUBMIT</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flex: 1
  },
  text: {
    color: Colors.gray,
    marginBottom: 15,
    fontSize: 18
  },
});

export default SurveyView;
