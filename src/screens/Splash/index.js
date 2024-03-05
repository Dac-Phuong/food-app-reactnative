import {StyleSheet, StatusBar, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';

export default function Splash({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Onboarding');
    }, 2000);
  }, []);
  return (
    <View className="flex-1 relative" style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View>
        <Image
          style={styles.image}
          className="absolute items-center justify-center"
          resizeMode="cover"
          source={require('../../image/background/Pattern.png')}
        />
      </View>
      <View>
        <Image
          style={styles.image}
          className="absolute left-28 top-56 items-center justify-center"
          resizeMode="cover"
          source={require('../../image/banner/dots.png')}
        />
        <Image
          style={styles.image}
          className="absolute left-20 top-56 items-center justify-center"
          resizeMode="cover"
          source={require('../../image/banner/Finish.png')}
        />
        <Image
          style={styles.image}
          className="absolute left-20 top-20 bottom-0 mt-96 items-center justify-center"
          resizeMode="cover"
          source={require('../../image/banner/FoodRuns.png')}
        />
      </View>
    </View>
  );
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '$paddingTop',
  },
  image: {
    resizeMode: 'cover',
  },
});
