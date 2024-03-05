import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Swiper from 'react-native-swiper';
import {useNavigation} from '@react-navigation/native';
const BannerSlide = () => {
  const navigation = useNavigation();
  return (
    <View className="h-[150px] w-full  rounded-[10px] mt-5 mb-5 ">
      <Swiper
        autoplayTimeout={3}
        autoplay
        loop
        dot={<View style={styles.dot}></View>}
        activeDot={<View style={styles.active}></View>}>
        <View className="items-center relative justify-center rounded-[10px] w-max  ">
          <Image
            className="w-full rounded-[10px] h-full"
            resizeMode="cover"
            source={require('../image/banner/banner.png')}
          />
          <View className="absolute left-5 w-[40%]">
            <Text className="text-lg font-bold  text-[#FFF]">
              Special Offer
            </Text>
            <Text className="text-lg font-bold leading-5 text-[#FFF]">
              for March
            </Text>
            <Text className="text-white text-xs">
              we are here with the best deserts intown.
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Search')}
              className="w-16 h-7 mt-2 justify-center items-center rounded-[4px] bg-white">
              <Text className="text-[#FF0000] font-bold text-xs">Buy Now</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="items-center relative justify-center rounded-[10px]  w-max  ">
          <Image
            className="w-full rounded-[10px] h-full"
            resizeMode="cover"
            source={require('../image/banner/banner.png')}
          />
          <View className="absolute left-5 w-[40%]">
            <Text className="text-lg font-bold  text-[#FFF]">
              Special Offer
            </Text>
            <Text className="text-lg font-bold leading-5 text-[#FFF]">
              for March
            </Text>
            <Text className="text-white text-xs">
              we are here with the best deserts intown.
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Search')}
              className="w-16 h-7 mt-2 justify-center items-center rounded-[4px] bg-white">
              <Text className="text-[#FF0000] font-bold text-xs">Buy Now</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="items-center relative justify-center rounded-[10px]  w-max  ">
          <Image
            className="w-full rounded-[10px] h-full"
            resizeMode="cover"
            source={require('../image/banner/banner.png')}
          />
          <View className="absolute left-5 w-[40%]">
            <Text className="text-lg font-bold  text-[#FFF]">
              Special Offer
            </Text>
            <Text className="text-lg font-bold leading-5 text-[#FFF]">
              for March
            </Text>
            <Text className="text-white text-xs">
              we are here with the best deserts intown.
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Search')}
              className="w-16 h-7 mt-2 justify-center items-center rounded-[4px] bg-white">
              <Text className="text-[#FF0000] font-bold text-xs">Buy Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Swiper>
    </View>
  );
};

export default BannerSlide;
const styles = StyleSheet.create({
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginRight: 5,
    marginLeft: 5,
    marginBottom: -90,
  },
  active: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF0000',
    marginBottom: -90,
    marginRight: 5,
    marginLeft: 5,
  },
});
