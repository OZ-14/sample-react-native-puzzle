import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Animated, ScrollView, Eeasing} from 'react-native';
import Flame from '../../Components/Flame';
import StartScreen from '../StartScreen';
import PuzzleDetail from '../PuzzleDetail';
import Size from '../../Utils/Size.js'
import puzzles from '../../Mock/Puzzles.js';


class MainScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      scrollY: 0,
      scrollEnabled: true,
      puzzles: puzzles
    }
  }

  onScroll = (e) => {
    this.setState({scrollY: e.nativeEvent.contentOffset.y})
  }

  changeScrollEnabled = () => {
    this.setState({
      scrollEnabled: !this.state.scrollEnabled
    })
  }

  render() {
    return (
      <View style={[styles.container]}>
        <ScrollView
        scrollEnabled={this.state.scrollEnabled}
        onScroll={this.onScroll}
        contentContainerStyle={[styles.container]}>
          {this.state.puzzles.map(item => {
            return (
              <PuzzleDetail
                key={`${item.title}`}
                puzzle={item}
                scrollY={this.state.scrollY}
                changeScrollEnabled={this.changeScrollEnabled}
              />

            )
          })}
        </ScrollView>
        <StartScreen />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff'
  }
});

export default MainScreen
