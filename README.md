# sample-react-native-puzzle
こちらは、技術書典5にて頒布したReectNativeAniamtionで紹介したAnimatedを実際に使って見るためにしたアプリです。


以下にざっくりとビルドまでの手順を載せておきます。
react-nativeが入っていることが前提になっています。

## cloneする
このアプリを使用するまえにクローンします。
```
$ git clone git@github.com:OZ-14/sample-react-native-puzzle.git
or
$ git clone https://github.com/OZ-14/sample-react-native-puzzle.git
```

## npm install または yarn install
node_modulesを作成・更新します。
```
$ npm install
or
$ yarn install
```

## buildする
ここまできたらビルドしましょう。
私はAndroidで作成していたのでiOSでの動作がまだ確認できていませんが、
サードパーティを現在を入れずに初期状態で作成したので問題ないとは思います。
```
$ react-native run-android
or
$ react-native run-ios
```
