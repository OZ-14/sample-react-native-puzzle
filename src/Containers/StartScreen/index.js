import React, {Component} from 'react';
import {Text, View, Animated, TouchableWithoutFeedback} from 'react-native';
import Size from '../../Utils/Size.js';
import styles from './style';


class StartScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      close: false,
      opacity1: new Animated.Value(1),
      opacity2: new Animated.Value(0),
      opacity3: new Animated.Value(0),
      opacityScreen: new Animated.Value(1)
    };
  }

  componentDidMount() {
    Animated.sequence([
      Animated.timing(
        this.state.opacity1,
        {
          toValue: 0,
          duration: 800,
          delay: 1500
        }
      ),
      Animated.timing(
        this.state.opacity2,
        {
          toValue: 1,
          duration: 800
        }
      ),
      Animated.timing(
        this.state.opacity2,
        {
          toValue: 0,
          duration: 800,
          delay: 1500
        }
      ),
      Animated.timing(
        this.state.opacity3,
        {
          toValue: 1,
          duration: 800
        }
      )
    ]).start();
  }

  onPress = () => {
    Animated.timing(
      this.state.opacityScreen,
      {
        toValue: 0,
        duration: 1200
      }
    ).start(() => {
      this.setState({close: true})
    });
  }


  render() {

    if (this.state.close) {
      return <View />
    }

    return (
      <Animated.View style={[styles.container, {opacity: this.state.opacityScreen}]}>
        <View style={[styles.titleContainer]}>
          <Text style={[styles.title]}>ReactNativeのAnimationパズル</Text>
        </View>

        <View>

        <Animated.View style={[{position: 'absolute', opacity: this.state.opacity1}]}>
          <Text style={[styles.text]}>{'こちらのアプリはReactNativeのAnimationを使って作成したパズルゲームです。'}</Text>
        </Animated.View>

        <Animated.View style={[{position: 'absolute', opacity: this.state.opacity2}]}>
          <Text style={[styles.text]}>{'Animation使ったことある人、ない人、これから使う人、それぞれ何か参考になればと思います。'}</Text>
        </Animated.View>

        <Animated.View style={[{position: 'absolute', opacity: this.state.opacity3}]}>
          <Text style={[styles.text]}>{'以下のボタンから始められます。'}</Text>
        </Animated.View>

        </View>

        <TouchableWithoutFeedback
          onPress={this.onPress}
        >
          <View style={[styles.button]}>
            <Text >始める</Text>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  }
}



export default StartScreen
