import {StyleSheet} from 'react-native';
import Size from '../../Utils/Size.js'

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#fff'
  },
  titleContainer: {
    width: Size.deviceWidth,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  text: {
    fontSize: 16,
    paddingHorizontal: 48
  },
  button: {
    marginTop: 160,
    marginHorizontal: 72,
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    borderRadius: 15,
    backgroundColor: '#aaf'
  }
});

export default styles;
