import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Text, View, StyleSheet } from 'react-native';
import { getLocales, setLocale } from './LocaleActions';
import { Colors } from '../../config/styles';
import LocalesListItem from './LocalesListItem';

class LocalesListView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleLocationClick = this.handleLocationClick.bind(this);
  }

  componentWillMount() {
    this.props.getLocales();
  }

  handleLocationClick(locale) {
    this.props.setLocale(locale);
    Actions.GetStarted();
  }

  render() {
    const { locales } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>WHERE DO YOU WANT TO GO?</Text>
        <View style={styles.cards}>
          {locales && locales.map(locale => <LocalesListItem key={locale.id} locale={locale} handleLocationClick={this.handleLocationClick} />) }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center'
  },
  cards: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',

  },
  title: {
    color: Colors.brandPrimary,
    fontSize: 36,
    textAlign: 'center',
    marginBottom: 15
  },

});


const mapStateToProps = ({ LocaleReducer }) => {
  const { locales } = LocaleReducer;
  return {
    locales,
  };
};

export default connect(mapStateToProps, { getLocales, setLocale })(LocalesListView);
