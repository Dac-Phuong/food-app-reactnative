import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import API, {baseUrl} from '../../../api';
import {REQUEST_API} from '../../../api/method';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {addToCart, getDataCart} from '../../../redux/actions';
import {useSelector} from 'react-redux';
const {width} = Dimensions.get('window');
const cardWidth = width / 2 - 20;
export default function ProductsSelling() {
  const userData = useSelector(state => state.authReducer.userData);
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const getData = async () => {
    try {
      const url = API.getProductsSelling();
      const [res] = await Promise.all([
        REQUEST_API({
          url: url,
          method: 'get',
        }),
      ]);
      if (res.data) {
        setData(res.data);
      } else {
        console.log(res.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <View>
      <View className="flex-row justify-between p-3 pt-0">
        <Text className="text-lg font-medium text-black">Các món ăn bán chạy </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ProductAllSeller', {
              paramKey: data,
            })
          }>
          <Text className="text-red-600">Xem tất cả</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="pt-0 flex-row">
          {data.map((item, index) => {
            const imagePath = 'uploads/';
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ProductDetail', {
                    paramKey: item,
                  })
                }
                key={index}
                className="h-[250px] rounded-lg ml-3 mb-4"
                style={{
                  width: cardWidth,
                  shadowOffset: {
                    width: 1,
                    height: 3,
                  },
                  shadowOpacity: 0.17,
                  shadowRadius: 4.65,
                  elevation: 5,
                  backgroundColor: '#FFF',
                  marginVertical: 5,
                }}>
                <Image
                  style={{
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                  }}
                  resizeMode="cover"
                  className="w-full h-[50%]"
                  source={{uri: `${baseUrl}${imagePath}${item.image}`}}
                />
                <View className="pl-2 pr-2">
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    className="text-base pt-2 font-bold text-black">
                    {item.name}
                  </Text>
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    className="text-[#A9A9A9]">
                    {item.gram}
                  </Text>
                </View>
                <View className="pl-2 pr-2 mt-auto pb-2 flex-row items-center justify-between">
                  <Text className="text-[#FF0000] text-base font-bold">
                    {item.price.toLocaleString('vi-VN')}đ
                  </Text>
                  <TouchableOpacity
                    onPress={() => [
                      addToCart({
                        product_id: item.id,
                        customer_id: userData.customer.id,
                        quantity: 1,
                        total_money: item.price,
                      }),
                      getDataCart(userData?.customer?.id),
                    ]}
                    className="w-[40px] items-center justify-center h-[40px] rounded-[20PX] bg-[#FF0000]">
                    <MaterialCommunityIcons
                      name="cart-variant"
                      color={'#fff'}
                      size={25}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
