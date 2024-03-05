import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/dist/Entypo';
import {useSelector} from 'react-redux';
import { baseUrl } from '../../api';

export default function Account({navigation}) {
  const userData = useSelector(state => state.authReducer.userData);
  return (
    <SafeAreaView className="flex-1 overflow-hidden bg-white">
      <View className="p-3">
        <View className="flex-row  items-center justify-center">
          <View className="w-[100%] absolute flex-row justify-between items-center ml-auto mr-auto">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                elevation: 5,
              }}
              className="w-[40px] items-center bg-white rounded-[10px] justify-center h-[40px]">
              <Icon name="chevron-small-left" color={'#000'} size={30} />
            </TouchableOpacity>
          </View>
          <Text className="text-xl  text-[#000]">Tài khoản của tôi</Text>
        </View>
        <View className=" w-full mt-[15%]  items-center">
          <View
            style={{
              shadowOffset: {
                width: 1,
                height: 3,
              },
              shadowOpacity: 0.17,
              shadowRadius: 4.65,
              elevation: 10,
              backgroundColor: '#FFF',
              borderRadius: 10,
              borderColor: '#FFF',
            }}
            className="w-[100px] border-2 relative  h-[100px] rounded-xl">
            <Image
              className="w-fll h-full rounded-[10px]"
              resizeMode="cover"
              source={
                userData?.customer?.avatar
                  ? {uri: `${baseUrl}storage/${userData?.customer?.avatar}`}
                  : {
                      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDJzEaxLN-jGRYYUO65pWu7Q9GXoNt4LUSSA&usqp=CAU',
                    }
              }
            />
          </View>
          <Text className="text-black font-bold text-lg pt-4 ">
            {userData?.customer?.full_name}
          </Text>
          <Text>{userData?.customer?.email}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('EditAccount')}
            className="rounded-lg mt-3 h-[40px] px-2 bg-[#FF0000] items-center justify-center">
            <Text className="text-white">Sửa thông tin tài khoản</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('ListOrder')}
          style={{
            shadowOffset: {
              width: 1,
              height: 3,
            },
            shadowOpacity: 0.17,
            shadowRadius: 4.65,
            elevation: 5,
            backgroundColor: '#FFF',
            borderRadius: 6,
          }}
          className="w-[100%] bg-slate-500 justify-center pl-4 pr-4 mt-10 h-[60px]">
          <Text className="text-lg text-black">Đơn hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Address')}
          style={{
            shadowOffset: {
              width: 1,
              height: 3,
            },
            shadowOpacity: 0.17,
            shadowRadius: 4.65,
            elevation: 5,
            backgroundColor: '#FFF',
            borderRadius: 6,
          }}
          className="w-[100%] bg-slate-500 justify-center pl-4 pr-4 mt-3 h-[60px]">
          <Text className="text-lg text-black">Địa chỉ giao hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Favorite')}
          style={{
            shadowOffset: {
              width: 1,
              height: 3,
            },
            shadowOpacity: 0.17,
            shadowRadius: 4.65,
            elevation: 5,
            backgroundColor: '#FFF',
            borderRadius: 6,
          }}
          className="w-[100%] bg-slate-500 justify-center pl-4 pr-4 mt-3 h-[60px]">
          <Text className="text-lg text-black">Danh mục yêu thích</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Chat')}
          style={{
            shadowOffset: {
              width: 1,
              height: 3,
            },
            shadowOpacity: 0.17,
            shadowRadius: 4.65,
            elevation: 5,
            backgroundColor: '#FFF',
            borderRadius: 6,
          }}
          className="w-[100%] bg-slate-500 justify-center pl-4 pr-4 mt-3 h-[60px]">
          <Text className="text-lg text-black">Liên hệ</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
