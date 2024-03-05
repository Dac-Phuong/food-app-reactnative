import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
const {width} = Dimensions.get('window');
const cardWidth = width / 2 - 20;
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {REQUEST_API} from '../../api/method';
import API, {baseUrl} from '../../api';
import {addToCart, getDataCart, saveCartData} from '../../redux/actions';
import {useSelector} from 'react-redux';

export default function Products(categor_id) {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const userData = useSelector(state => state.authReducer.userData);

  const getData = async () => {
    try {
      const url = API.getProducts(categor_id?.categor_id);
      const [res] = await Promise.all([
        REQUEST_API({
          url: url,
          method: 'get',
        }),
      ]);
      if (res.data) {
        setProducts(res.data);
        getDataCart(userData?.customer?.id);
      } else {
        console.log(res.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [categor_id?.categor_id]),
  );
  return (
    <View className="mt-3 pr-3">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row">
          {products.map((item, index) => {
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
                    {item?.price?.toLocaleString('vi-VN')}đ
                  </Text>
                  <TouchableOpacity
                    onPress={() => [
                      addToCart({
                        product_id: item.id,
                        customer_id: userData?.customer?.id,
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
