import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  ScrollView,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import API, {baseUrl} from '../../../api';
import RenderHTML from 'react-native-render-html';
import Button from '../../../components/Button';
import {useSelector} from 'react-redux';
import {
  addToCart,
  addToFavorite,
  getDataFavorite,
} from '../../../redux/actions';
import {useFocusEffect} from '@react-navigation/native';
import {REQUEST_API} from '../../../api/method';
import {AlertOnly} from '../../../components/alert';
export default function ProductDetail({navigation, route}) {
  const userData = useSelector(state => state.authReducer.userData);
  const favoriteData = useSelector(state => state.favoriteReducer.favoriteData);
  const prd = route.params.paramKey;
  const [item, SetItem] = useState([]);
  const {width} = useWindowDimensions();
  const [loading, setLoading] = useState(false);
  const imagePath = 'uploads/';
  const [firstApiCall, setFirstApiCall] = useState(true);
  const getProductDetail = async () => {
    try {
      if (firstApiCall) {
        setLoading(true);
      }
      const url = API.getProductDetail(prd.id);
      const [res] = await Promise.all([
        REQUEST_API({
          url: url,
          method: 'get',
        }),
      ]);

      if (res.data) {
        SetItem(res.data);
      } else {
        AlertOnly(res.msg);
      }
    } catch (error) {
      AlertOnly(error.message);
    } finally {
      if (firstApiCall) {
        setLoading(false);
        setFirstApiCall(false);
      }
    }
  };
  useEffect(() => {
    getProductDetail();
  }, []);
  const isProductInFavorites = productId => {
    return favoriteData.some(favorite => favorite.product_id === productId);
  };
  return (
    <SafeAreaView className="bg-white flex-1">
      <StatusBar translucent={true} backgroundColor="transparent" />
      {loading ? (
        <View className="absolute bg-white top-0 bottom-0 left-0 right-0 justify-center items-center">
          <View className="flex-row justify-center items-center">
            <ActivityIndicator size="small" color={'red'} />
            <Text style={{marginLeft: 10, fontSize: 16}}>Loading...</Text>
          </View>
        </View>
      ) : (
        <View className="bg-white flex-1">
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <View className="bg-white">
              <Image
                resizeMode="cover"
                style={{height: 400}}
                source={{uri: `${baseUrl}${imagePath}${item.image}`}}
              />
              <View className="w-full mt-10 absolute flex-row p-4 justify-between items-center ml-auto mr-auto">
                <View className="w-[40px] items-center bg-white rounded-[10px] justify-center h-[40px]">
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="p-2">
                    <Entypo name="chevron-left" color={'#000'} size={22} />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    elevation: 10,
                    overflow: 'hidden',
                  }}
                  className="w-[40px] items-center bg-white rounded-[10px] justify-center h-[40px]">
                  <TouchableOpacity
                    onPress={() => [
                      addToFavorite({
                        product_id: item.id,
                        customer_id: userData.customer.id,
                      }),
                      getProductDetail(),
                      getDataFavorite(userData?.customer?.id),
                    ]}
                    className="p-2 items-center">
                    {isProductInFavorites(item.id) ? (
                      <Icon name={'heart'} color={'red'} size={20} />
                    ) : (
                      <Icon name={'heart'} color={'#ccc'} size={20} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              <View className="p-4">
                <View className="items-center">
                  <Text className="text-center  rounded-sm w-10 h-1 bg-rose-400"></Text>
                </View>
                <View className="flex-row justify-between items-center">
                  <Text className="text-2xl mt-4 font-normal text-black w-3/4">
                    {item.name}
                  </Text>
                  <Text className="text-xl mt-4 font-bold text-red-600">
                    {item?.price?.toLocaleString('vi-VN')}đ
                  </Text>
                </View>
                <View className="flex-row pt-4 items-center">
                  <View className="flex-row items-center">
                    <FontAwesome color={'#FFC41F'} name="star" size={18} />
                    <Text className="pl-2 text-sm">{4.5} Đánh giá</Text>
                  </View>
                  <View className="flex-row justify-center items-center pl-14">
                    <Ionicons color={'#FF0000'} name="time-outline" size={22} />
                    <Text className="pl-2 text-sm ">
                      {item?.number_sold} Đơn hàng
                    </Text>
                  </View>
                </View>
                <View className="pb-2">
                  <RenderHTML
                    source={{html: `${item.description}`}}
                    contentWidth={width}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
          <View className="px-3">
            <Button
              onPress={() =>
                addToCart({
                  product_id: item.id,
                  customer_id: userData.customer.id,
                  quantity: 1,
                  total_money: item.price,
                })
              }
              label={'Thêm vào giỏ hàng'}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
