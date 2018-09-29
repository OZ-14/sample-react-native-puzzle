/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Animated, TouchableWithoutFeedback, PanResponder} from 'react-native';
import Size from '../../Utils/Size';
import Style from '../../Utils/Style';
import styles from './style'

export default class Flame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animation: false,
      nullBlockIndex: this.props.square - 1,
      blocks: []
    }
    this.count = 0;
    this.side = Math.sqrt(props.square) || 9
    this.blockSize = (Size.deviceWidth - 32) / this.side
  }

  componentWillMount() {
    // set panHandler
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderRelease: (e, guesture) => {
        const dx = guesture.dx
        const dy = guesture.dy
        if (Math.abs(dx) <  30 && Math.abs(dy) < 30) {
          return;
        }

        if (Math.abs(dx) > Math.abs(dy)) {
          if (dx > 0) {
            //右移動
            this.responderMoveBlock(-1)
          } else {
            //左移動
            this.responderMoveBlock(1)
          }
        } else if (dy > 0) {
          //下移動
          this.responderMoveBlock(-this.side)
        } else {
          //上移動
          this.responderMoveBlock(this.side)
        }
      }
    });
    console.log(this.panResponder)
  }

  componentDidMount() {
    let blocks = [];
    for(i = 0; i < this.props.square - 1; i++) {
      const colorCode = this.getRandomCode()
      const block = {
        currentBlockIndex: i,
        correctBlockIndex: i,
        value: i,
        blockPosition: new Animated.ValueXY(this.getInitialBlockPosition(i)),
        color: colorCode
      }
      blocks.push(block)
    }
    this.setState({blocks}, () => {
      this.setInitialPuzzle()
    })

  }

  moveBlock = (block) => {
    if (this.state.animation || !this.movableBlock(block.currentBlockIndex)) {
      return;
    }
    this.setState({animation: true})
    const x = this.state.nullBlockIndex % this.side * this.blockSize;
    const y = Math.floor(this.state.nullBlockIndex / this.side) * this.blockSize;
    Animated.timing(
      block.blockPosition, // Auto-multiplexed
      {
        toValue: {x: x, y: y},
        duration: 100
      }
    ).start(() => {
      //配列の順番を入れ替えない
      const newNullBlockIndex = block.currentBlockIndex;
      const blocks = Object.assign([], this.state.blocks)
      blocks[block.correctBlockIndex].currentBlockIndex = this.state.nullBlockIndex;
      this.setState({
        animation: false,
        blocks: blocks,
        nullBlockIndex: newNullBlockIndex
      })
    });
  }

  async setInitialPuzzle() {
    const { blocks, nullBlockIndex } = this.state;

    const changeBlocks = Object.assign([], blocks);
    let changeNullIndex = nullBlockIndex;
    const moveArray = [-1, 1, -this.side, this.side]

    for(let i = 0; i < this.props.square * 2.5; i++) {
      const randomIndex = Math.floor(Math.random() * 4);
      let moveIndex = moveArray[randomIndex];
      const blockIndex = changeNullIndex + moveIndex;

      if (blockIndex > blocks.length || blockIndex < 0) {
        continue;
      }

      const selectBlocks = changeBlocks.filter((block) => {
        return block.currentBlockIndex === blockIndex;
      })
      if (selectBlocks.length === 0) {
        continue;
      }

      const x = changeNullIndex % this.side * this.blockSize;
      const y = Math.floor(changeNullIndex / this.side) * this.blockSize;
      changeBlocks[selectBlocks[0].correctBlockIndex].blockPosition.x.setValue(x)
      changeBlocks[selectBlocks[0].correctBlockIndex].blockPosition.y.setValue(y)

      const newNullBlockIndex = selectBlocks[0].currentBlockIndex;
      changeBlocks[selectBlocks[0].correctBlockIndex].currentBlockIndex = changeNullIndex;
      changeNullIndex = newNullBlockIndex

    }
    this.setState({
      blocks: changeBlocks,
      nullBlockIndex: changeNullIndex
    })
  }

  getInitialBlockPosition(index) {
    const x = index % this.side * this.blockSize;
    const y = Math.floor(index / this.side) * this.blockSize;
    return ({x, y});
  }

  getRandomCode() {
    const rNum = Math.floor(Math.random() * 256);
    const gNum = Math.floor(Math.random() * 256);
    const bNum = Math.floor(Math.random() * 256);
    const rCode = ('00' + rNum.toString(16)).slice(-2)
    const gCode = ('00' + gNum.toString(16)).slice(-2)
    const bCode = ('00' + bNum.toString(16)).slice(-2)
    return `#${rCode}${gCode}${bCode}`;
  }

  movableBlock(index) {
    const { nullBlockIndex } = this.state;
    const nullBlockColumn = nullBlockIndex % this.side;
    const nullBlockLine = Math.floor(nullBlockIndex / this.side);
    const blockColumn = index % this.side;
    const blockLine = Math.floor(index / this.side);

    const distance = Math.sqrt(
      Math.pow(nullBlockColumn - blockColumn, 2) +
      Math.pow(nullBlockLine - blockLine, 2)
    )
    return distance === 1
  }

  responderMoveBlock(moveIndex) {
    const { blocks, nullBlockIndex } = this.state;
    const blockIndex = nullBlockIndex + moveIndex;
    if (blockIndex > blocks.length || blockIndex < 0) {
      return;
    }
    const selectBlocks = blocks.filter((block) => {
      return block.currentBlockIndex === blockIndex;
    })
    if (selectBlocks.length === 0) {
      return;
    }
    this.moveBlock(selectBlocks[0]);
  }

  render() {
    return (
      <View
      style={[
        styles.container,
        Style.w(this.blockSize * this.side),
        Style.h(this.blockSize * this.side)
      ]}
      {...this.panResponder.panHandlers}>
        <View
        >
        {this.state.blocks.map((block) => {
          return (
            <Animated.View
              key={`${block.correctBlockIndex}`}
              style={[
                styles.box,
                Style.w(this.blockSize),
                Style.h(this.blockSize),
                Style.bg(block.color),
                {top: block.blockPosition.y, left: block.blockPosition.x}]}
            >
              <Text style={[styles.text]}>{block.value}</Text>
            </Animated.View>
          )
        })}
        </View>
      </View>
    );
  }
}

Flame.defaultProps = {
  square: 9
}
