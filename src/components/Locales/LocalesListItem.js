import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { ListItem, Card, } from '../common';
import { Colors } from '../../config/styles';

class LocalesListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { locale } = this.props;
    return (
      locale.attributes.active ?
        <TouchableOpacity style={styles.toplevel} onPress={() => this.props.handleLocationClick(locale)}>
          <View style={styles.container}>
            <ImageBackground
              style={styles.imageBackground}
              source={{ uri: locale.attributes.image._url }} />
            <Text style={styles.text}>{locale.attributes.city}</Text>
          </View>
        </TouchableOpacity> :
        <View style={styles.toplevel}>
          <View style={styles.container}>
            <ImageBackground
              style={styles.imageBackground}
              source={{ uri: locale.attributes.image._url }}>
              <View style={styles.overlayOpacity}>
                <Text style={styles.overlayText}> Coming Soon </Text>
              </View>
            </ImageBackground>
            <Text style={styles.text}>{locale.attributes.city}</Text>
          </View>
        </View>

    );
  }
}


const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    color: Colors.brandPrimary,
    textAlign: 'center'
  },
  container: {
    marginBottom: 15,
  },
  toplevel: {
    flexBasis: '33.333%'
  },
  overlayOpacity: {
    backgroundColor: Colors.brandPrimary,
    opacity: 0.7,
    width: 100,
    height: 100,
    justifyContent: 'center',
    marginBottom: 5
  },
  overText: {
    textAlign: 'center',
    fontSize: 24,
  },
  imageBackground: {
    width: 100,
    height: 100,
    alignSelf: 'center'
  }
});

export default LocalesListItem;
