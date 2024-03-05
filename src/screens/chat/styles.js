import {StyleSheet, Platform, Dimensions} from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  main: {
    flex: 1,
    paddingBottom: 11,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  txt: {
    color: '#404040',
    marginLeft: 10,
    textTransform: 'uppercase',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom:10,
    marginHorizontal:10,
    borderRadius:6
  },
  lineSep: {
    height: 2,
    backgroundColor: '#FFFFFF',
  },
  btn: {
    flex: 1,
  },
});

export default styles;
