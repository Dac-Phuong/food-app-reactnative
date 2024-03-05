import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
export default function DoneOrder() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-white relative">
      {/* <StatusBar translucent backgroundColor="transparent" /> */}
      <View className="">
        <Image
          style={{width: '100%', height: '100%'}}
          className="items-center justify-center"
          source={require('../../../image/product/Finish_Order.png')}
        />
      </View>
      <View
        className="absolute top-2/4  h-40 w-60 text-center items-center"
        style={{left: '20%'}}>
        <Text className="font-bold text-2xl">Thank You!</Text>
        <Text className="font-bold text-2xl">Order Completed</Text>
      </View>
      <View className="flex-row absolute top-3/4 p-3 justify-between w-full">
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          className="mb-[20px] w-[48%] rounded-[6px] items-center justify-center h-[55px] bg-[#FF0000]">
          <Text className="text-white text-base font-bold">Quay lại Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('ListOrder')}
          className="mb-[20px] w-[48%] rounded-[6px] items-center justify-center h-[55px] bg-[#FF0000]">
          <Text className="text-white text-base font-bold">Xem đơn hàng</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
