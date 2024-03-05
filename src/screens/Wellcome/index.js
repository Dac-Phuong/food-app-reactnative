import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React from 'react';
import Button from '../../components/Button';

export default function WellCome({navigation}) {

  return (
    <View className="flex-1 bg-white">
      <StatusBar translucent backgroundColor="transparent" />
      <Image
        className="w-full"
        source={require('../../image/background/wellcome.png')}
      />
      <View className="w-full items-center justify-center">
        <Text className="text-2xl text-[#FF0000]">Wellcome</Text>
        <Text className="w-[65%] justify-items-center  text-[#575757] pt-2 text-sm text-center">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit . Labore
          voluptatum esse rerum
        </Text>
        <View className="items-center pl-5 pr-5 mt-8  w-full justify-center">
          <Button
            onPress={() => navigation.navigate('Login')}
            lable={'Login'}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            className="border-[1px] border-[#FF0000] mb-[20px] w-[100%] rounded-[10px] items-center justify-center h-[55px] ">
            <Text className="text-[#FF0000] text-lg font-bold">Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
