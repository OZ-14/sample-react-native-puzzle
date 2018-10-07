import React, {Component} from 'react';
import {Text, View, Animated, TouchableWithoutFeedback, ScrollView} from 'react-native';
import Flame from '../../Components/Flame';
import Size from '../../Utils/Size';
import Style from '../../Utils/Style';
import styles from './style';

class PuzzleDetail extends Component {
  constructor(props){
    super(props);
    this.state = {
      animation: false,
      visible: false,
      visibleHeader: false,
      transition: new Animated.Value(0),
      contentScrollY: new Animated.Value(0),
      buttonPosition: new Animated.Value(0),
      buttonOpacity: new Animated.Value(1),
      playPuzzle: false
    };
    this.positionY = null;
  }

  componentDidMount() {

  }

  onPress = () => {
    if (this.state.animation) {
      return;
    }

    this.props.changeScrollEnabled();
    if (this.state.visible) {
      this.closeDetail();
    } else {
      this.openDetail();
    }
  }

  onPressStart = () => {
    Animated.timing(
      this.state.buttonOpacity,
      {
        toValue: 0,
        duration: 300
      }
    ).start(() => {
      this.setState({
        playPuzzle: true
      })
    });
  }

  openDetail() {
    Animated.loop(
      Animated.sequence([
        Animated.timing(
          this.state.buttonPosition,
          {
            toValue: 150,
            duration: 500
          }
        ),
        Animated.timing(
          this.state.buttonPosition,
          {
            toValue: 0,
            duration: 500
          }
        )
      ])
    ).start();

    this.setState(
      {
        animation: true,
        visible: !this.state.visible
      },
      () => {
        Animated.timing(
          this.state.transition,
          {
            toValue: 1,
            duration: 300
          }
        ).start(() => {
          this.setState({
            animation: false,
            visibleHeader: !this.state.visibleHeader
          })
        });
      }
    )
  }

  closeDetail() {
    this.setState(
      {
        animation: true,
        visibleHeader: !this.state.visibleHeader
      },
      () => {
        Animated.timing(
          this.state.transition,
          {
            toValue: 0,
            duration: 300
          }
        ).start(() => {
          this.setState({
            animation: false,
            visible: !this.state.visible,
            playPuzzle: false
          })
          this.state.buttonOpacity.setValue(1)
        });
      }
    );
  }

  render() {
    const { puzzle } = this.props;
    const {
      transition,
      contentScrollY,
      visible,
      visibleHeader,
      buttonPosition,
      buttonOpacity,
      playPuzzle
    } = this.state;

    const headerImageSize = transition.interpolate({
      inputRange: [0, 1],
      outputRange: [Size.ScreenWidth - 30, Size.ScreenWidth]
    });

    const containerTop = transition.interpolate({
      inputRange: [0, 1],
      outputRange: [0, (this.props.scrollY - this.positionY)]
    });

    const contentHeight = transition.interpolate({
      inputRange: [0, 1],
      outputRange: [Size.ScreenWidth - 30, Size.ScreenHeight]
    });

    const headerHeight = contentScrollY.interpolate({
      inputRange: [0, Size.ScreenWidth - 56],
      outputRange: [Size.ScreenWidth, 56],
      extrapolate: 'clamp'
    });

    const headerOpacity = contentScrollY.interpolate({
      inputRange: [0, Size.ScreenWidth - 56],
      outputRange: [0, 1]
    });


    return (
      <Animated.View
        style={[
          Style.bg('#fff'),
          Style.h(contentHeight),
          {top:containerTop, zIndex: transition},
          !this.state.visible && Style.mb(10)
        ]}
        onLayout={(e) => {
          if(!this.positionY) {
            this.positionY = e.nativeEvent.layout.y
          }
        }}
      >
        <ScrollView
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.state.contentScrollY}}}]
          )}
        >

          <Animated.View
            source={puzzle.image}
            style={[
              Style.w(headerImageSize),
              Style.h(headerImageSize),
              styles.headerImgae
            ]}
          />


        {this.state.visible && (
          <Animated.View style={[{ opacity: transition }]}>
            <Text style={[styles.description]}>{puzzle.description}</Text>
            <View style={[{height: 150}]} />
              {puzzle.text.map((text) => {
                return (
                  <Text key={`${text}`} style={[styles.text]} >{text}</Text>
                )
              })}
            <View style={[{height: 350}]} />

            <View style={[{alignItems: 'center'}, Style.mv(32)]}>
              <Flame
                square={puzzle.square}
              />
              {!playPuzzle && (
                <Animated.View style={[styles.coverView, {opacity: buttonOpacity}]}>
                  <TouchableWithoutFeedback
                    onPress={this.onPressStart}
                  >
                    <Animated.View style={[styles.button, {top: buttonPosition}]}>
                      <Text style={[Style.ph(16)]}>start</Text>
                    </Animated.View>
                  </TouchableWithoutFeedback>
                </Animated.View>
              )}
            </View>
          </Animated.View>
        )}
        </ScrollView>

        <View style={[styles.headerContainer]}>
          <TouchableWithoutFeedback
            onPress={this.onPress}
          >
            <Animated.Image
              source={puzzle.image}
              style={[
                Style.w(headerImageSize),
                visibleHeader ? Style.h(headerHeight) : Style.h(headerImageSize),
                styles.headerImgae
              ]}
            />
          </TouchableWithoutFeedback>
          {this.state.visible && (
            <Animated.View
              style={[
                styles.headerContainer,
                Style.bg('#fff'),
                Style.h(headerHeight),
                {opacity: headerOpacity}
              ]}
            >
              <View style={[styles.titleContainer]}>
                <Text style={[styles.titleText, Style.pl(16)]}>{puzzle.title}</Text>
              </View>
            </Animated.View>
            )}
          {this.state.visibleHeader && (
            <TouchableWithoutFeedback
              onPress={this.onPress}
            >
              <View style={styles.closeContainer}>
                <Text style={[styles.titleText]}>×</Text>
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>
      </Animated.View>
    );
  }
}

export default PuzzleDetail
