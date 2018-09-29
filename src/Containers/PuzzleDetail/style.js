import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bbb'
  },
  headerImgae: {
    alignSelf: 'center'
  },
  description: {
    fontSize: 12,
    padding: 16,
    marginTop: 8,
    backgroundColor: '#eee'
  },
  text: {
    fontSize: 16,
    padding: 16,
    backgroundColor: '#eee'
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left:0,
    right: 0
  },
  titleContainer: {
    height: 56,
    justifyContent: 'center'
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  closeContainer: {
    position: 'absolute',
    top:16 ,
    right: 16,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eee'
  },
  coverView: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    height: 50,
    borderRadius: 25,
    backgroundColor: '#9ff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default styles;
