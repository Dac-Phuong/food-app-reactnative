import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Feather from 'react-native-vector-icons/dist/Feather';
import BannerSlide from '../../components/Slider';
import API, {baseUrl} from '../../api';
import {REQUEST_API} from '../../api/method';
import Products from '../products';
import ProductsPopular from '../products/popular';
import ProductsSelling from '../products/selling';
import { getDataCart, getDataFavorite, saveCategoryData, saveUserData} from '../../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
export default function Home({navigation}) {
  const [Index, setIndex] = useState(0);
  const [categories, setCategories] = useState([]);
  const [categor_id, setCategory_id] = useState(null);
  const userData = useSelector(state => state.authReducer.userData);
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    try {
      setLoading(true);
      const url = API.getCategories();
      const [res] = await Promise.all([
        REQUEST_API({
          url: url,
          method: 'get',
        }),
      ]);
      if (res.data) {
        setCategories(res.data);
        setCategory_id(res.data[0]?.id);
        saveCategoryData(res.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log('error',error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getDataCart(userData?.customer?.id);
      getDataFavorite(userData?.customer?.id);
    }, []),
  );
  return (
    <SafeAreaView className="bg-white flex-1">
      {loading ? (
        <View className="absolute bg-white top-0 bottom-0 left-0 right-0 justify-center items-center">
          <View className="flex-row justify-center items-center">
            <ActivityIndicator size="small" color={'red'} />
            <Text style={{marginLeft: 10, fontSize: 16}}>Loading...</Text>
          </View>
        </View>
      ) : (
        <View className="flex-1 ">
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <View className="p-3">
              <View className="w-[100%] flex-row justify-between items-center ml-auto mr-auto">
                <View>
                  <View className="w-[40px] items-center bg-white rounded-[10px] justify-center h-[40px]">
                    <TouchableOpacity
                      onPress={() => navigation.openDrawer()}
                      className="p-2">
                      <AntDesign name="menu-fold" color={'#000'} size={22} />
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    elevation: 10,
                    overflow: 'hidden',
                  }}
                  className="w-[40px] items-center rounded-[20px] justify-center h-[40px]">
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Account')}
                    className="w-full h-full">
                    <Image
                      resizeMode="cover"
                      className="w-full h-full"
                      source={
                        userData?.customer?.avatar
                          ? {uri: `${baseUrl}storage/${userData?.customer?.avatar}`}
                          : {
                              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDJzEaxLN-jGRYYUO65pWu7Q9GXoNt4LUSSA&usqp=CAU',
                            }
                      }
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View className="w-[100%] items-center pl-2 rounded-[10px] h-[50px] mt-5 bg-[#F5F3F6] flex-row">
                <Feather name="search" color={'#CCC'} size={24} />
                <TextInput
                  onFocus={() => navigation.navigate('Search')}
                  className="w-full h-full"
                  placeholder="Tìm kiếm..."
                />
              </View>
              <BannerSlide />
            </View>
            <View className="w-full h-14 mt-5 pr-3 justify-between">
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {categories.map((item, index) => {
                  const imagePath = 'storage/category/';
                  return (
                    <TouchableOpacity
                      onPress={() => [setIndex(index), setCategory_id(item.id)]}
                      style={[
                        {
                          borderColor: '#FF0000',
                          borderWidth: 1,
                        },
                        Index === index && {
                          backgroundColor: '#FF0000',
                        },
                      ]}
                      key={item.id}
                      className="w-[140px] ml-3 pl-3 items-center flex-row rounded-md h-full ">
                      <Image
                        width={35}
                        height={40}
                        source={{uri: `${baseUrl}${imagePath}${item.image}`}}
                        resizeMode="cover"
                      />
                      <Text
                        className="pl-3 font-medium text-white"
                        style={[
                          {
                            color: '#000',
                          },
                          Index === index && {
                            color: '#FFF',
                          },
                        ]}>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
            <Products categor_id={categor_id} />
            <ProductsPopular />
            <ProductsSelling />
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
