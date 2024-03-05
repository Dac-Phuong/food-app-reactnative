import React, {useContext, useState, useEffect} from 'react';
import {View, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {baseUrl} from '../api';

const UserView = () => {
  const navigation = useNavigation();
  const userData = useSelector(state => state.authReducer.userData);

  return (
    <View className="">
      <View className="flex-row mt-5  items-center">
        <View className="w-[50px] h-[50px] rounded-[30px] justify-center items-center">
          <Image
            resizeMode="cover"
            className="w-full h-full rounded-[25px]"
            source={
              userData?.customer?.avatar
                ? {uri: `${baseUrl}storage/${userData?.customer?.avatar}`}
                : {
                    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDJzEaxLN-jGRYYUO65pWu7Q9GXoNt4LUSSA&usqp=CAU',
                  }
            }
          />
        </View>
        <View className="pl-2 text-black">
          <Text className=" text-gray-500 text-sm">
            {userData?.customer?.email}
          </Text>
          <Text className=" text-black font-semibold text-base">
            {userData?.customer?.full_name}
          </Text>
        </View>
      </View>
      <View
        style={{borderBottomWidth: 0.5, borderColor: 'red'}}
        className="mt-4 mb-5"
      />
    </View>
  );
};
export default UserView;
const styles = StyleSheet.create({});
