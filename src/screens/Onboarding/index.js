import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/dist/AntDesign';

const slides = [
  {
    id: 1,
    title: 'Select the',
    title1: 'Favorites Menu',
    description:
      '“Now eat well, dont leave the house,You can choose your favorite food only with one click"',
    image: require('../../image/onboarding/Illustartion.png'),
  },
  {
    id: 2,
    title: 'Good food at a ',
    title1: 'cheap price',
    description: '“You can eat at expensive restaurant with affordabla price"',
    image: require('../../image/onboarding/Illustration.png'),
  },
  {
    id: 3,
    title: 'Pick Up ',
    title1: 'The Delivery',
    description: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit"',
    image: require('../../image/onboarding/Illustartion.png'),
  },
];

export default function Onboarding({navigation}) {
  const buttonLabel = label => {
    return (
      <View className="p-[12px]">
        <Text className="font-bold text-black">{label}</Text>
      </View>
    );
  };
  const NextButton = () => {
    return (
      <View className="items-center justify-center p-[12px] w-12 h-12 rounded-[24px] bg-[#FF0000]">
        <Icon className="" name="arrowright" size={24} color="#FFF" />
      </View>
    );
  };
  const DoneButton = () => {
    return (
      <View className="items-center justify-center p-[12px] w-12 h-12 rounded-[24px] bg-[#FF0000]">
        <Icon className="" name="check" size={24} color="#FFF" />
      </View>
    );
  };
  return (
    <AppIntroSlider
      data={slides}
      renderItem={({item}) => {
        return (
          <View className="bg-white h-full w-full">
            <Image
              className=" h-[60%] w-full"
              source={item.image}
              resizeMode="contain"
            />
            <View className=" h-[40%] items-center w-full">
              <Text className="font-bold text-black text-2xl">
                {item.title}
              </Text>
              <Text className="font-bold text-black text-2xl">
                {item.title1}
              </Text>
              <Text className=" text-sm text-center pt-4 w-[65%] ">
                {item.description}
              </Text>
            </View>
          </View>
        );
      }}
      activeDotStyle={{
        backgroundColor: 'red',
      }}
      showSkipButton
      renderSkipButton={() => buttonLabel('Skip')}
      renderNextButton={() => NextButton()}
      renderDoneButton={() => DoneButton()}
      onDone={() => {
        navigation.navigate('Register');
      }}
    />
  );
}

const styles = StyleSheet.create({});
