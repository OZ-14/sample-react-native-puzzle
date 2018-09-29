const puzzle9 = require('../Image/puzzle.png');
const puzzle16 = require('../Image/puzzle16.png');
const puzzle25 = require('../Image/puzzle25.png');

const puzzles = [
  {
    title: 'パズル3x3',
    description: 'ごく一般的なスライドパズルを作成してみました。',
    text: [
      'こちらのパズルはReactNativeのAnimated.ViewをはじめとするAnimationを使ってみるために作成したアプリになります。',
      'このパズルは3x3のパズルです。',
      '全ての数字を0から7まで揃えることが目的です。',
      `下のスタートを押すことで始まります。`
    ],
    image: puzzle9,
    square: 9
  },
  {
    title: 'パズル4x4',
    description: 'ごく一般的なスライドパズルを作成してみました。',
    text: [
      'こちらのパズルはReactNativeのAnimated.ViewをはじめとするAnimationを使ってみるために作成したアプリになります。',
      'このパズルは4x4のパズルです。',
      '全ての数字を0から14まで揃えることが目的です。',
      `下のスタートを押すことで始まります。`
    ],
    image: puzzle16,
    square: 16
  },
  {
    title: 'パズル5x5',
    description: 'ごく一般的なスライドパズルを作成してみました。',
    text: [
      'こちらのパズルはReactNativeのAnimated.ViewをはじめとするAnimationを使ってみるために作成したアプリになります。',
      'このパズルは5x5のパズルです。',
      '全ての数字を0から23まで揃えることが目的です。',
      `下のスタートを押すことで始まります。`
    ],
    image: puzzle25,
    square: 25
  }
]

export default puzzles
