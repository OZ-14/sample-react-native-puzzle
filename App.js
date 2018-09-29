/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Animated} from 'react-native';
import Flame from './src/Components/Flame';
import MainScreen from './src/Containers/MainScreen'
import Size from './src/Utils/Size.js'
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialize: false
    }
  }

  render() {
    return (
      <View
        style={[styles.container]}
        onLayout={(e) => {
          Size.ScreenWidth = e.nativeEvent.layout.width;
          Size.ScreenHeight = e.nativeEvent.layout.height;
          this.setState({initialize: true})
        }}
      >
      {this.state.initialize && (
          <MainScreen />
      )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});
