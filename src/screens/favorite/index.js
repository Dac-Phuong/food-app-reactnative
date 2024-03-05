import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/dist/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {addToCart, getDataCart, saveFavoriteData} from '../../redux/actions';
import {useFocusEffect} from '@react-navigation/native';
import {AlertOnly} from '../../components/alert';
import API, {baseUrl} from '../../api';
import {REQUEST_API} from '../../api/method';

export default function Favorite({navigation}) {
  const userData = useSelector(state => state.authReducer.userData);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [firstApiCall, setFirstApiCall] = useState(true);

  const getDataFavorite = async () => {
    try {
      if (firstApiCall) {
        setLoading(true);
      }
      const url = API.getFavorite(userData?.customer?.id);
      const [res] = await Promise.all([
        REQUEST_API({
          url: url,
          method: 'get',
        }),
      ]);
      if (res.data) {
        setData(res.data);
        setLoading(false);
        saveFavoriteData(res.data);
      } else {
        setLoading(false);
        AlertOnly(res.msg);
      }
    } catch (error) {
      setLoading(false);
      AlertOnly(error.message);
    } finally {
      if (firstApiCall) {
        setLoading(false);
        setFirstApiCall(false);
      }
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      getDataFavorite();
    }, []),
  );
  return (
    <SafeAreaView className="flex-1 bg-white">
      {loading ? (
        <View className="absolute bg-white top-0 bottom-0 left-0 right-0 justify-center items-center">
          <View className="flex-row justify-center items-center">
            <ActivityIndicator size="small" color={'red'} />
            <Text style={{marginLeft: 10, fontSize: 16}}>Loading...</Text>
          </View>
        </View>
      ) : (
        <View className="">
          <View className="flex-row p-4 items-center justify-center">
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
            <Text className="text-xl  text-[#000]">Danh mục yêu thích</Text>
          </View>
          <ScrollView className="w-full h-full">
            <View className="items-center w-full mb-20">
              {data.map((item, index) => {
                const imagePath = 'uploads/';
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('ProductDetail', {
                        paramKey: item.product,
                      })
                    }
                    key={item.id}
                    style={{
                      shadowOffset: {
                        width: 1,
                        height: 3,
                      },
                      shadowOpacity: 0.17,
                      shadowRadius: 4.65,
                      elevation: 10,
                      backgroundColor: '#FFF',
                      width: '94%',
                      borderRadius: 8,
                      padding: 8,
                    }}
                    className="h-[120px] mt-2 flex-row items-center w-full">
                    <Image
                      resizeMode="cover"
                      style={{
                        borderRadius: 6,
                        width: '28%',
                        height: '100%',
                      }}
                      source={{
                        uri: `${baseUrl}${imagePath}${item.product.image}`,
                      }}
                    />
                    <View className="p-3 w-[70%]">
                      <Text className="text-lg text-black" numberOfLines={1}>
                        {item.product.name}
                      </Text>
                      <Text numberOfLines={2} className="text-sm text-[#ccc]">
                        {item.product.gram}
                      </Text>
                      <View className="flex-row justify-between items-center">
                        <Text className="text-lg font-bold text-[#FF0000]">
                          {item.product.price.toLocaleString('vi-VN')}đ
                        </Text>
                        <TouchableOpacity
                          onPress={() => [
                            addToCart({
                              product_id: item.product.id,
                              customer_id: userData?.customer?.id,
                              quantity: 1,
                              add_cart: true,
                              total_money: item.product.price,
                            }),
                            getDataFavorite(),
                            getDataCart(userData?.customer?.id),
                          ]}
                          className="w-[40px] items-center justify-center h-[40px] rounded-[20px] bg-[#FF0000]">
                          <MaterialCommunityIcons
                            name="cart-variant"
                            color={'#fff'}
                            size={22}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
            {data.length == 0 && (
              <View className="flex-1 justify-center items-center relative">
                <Image
                  className="w-full"
                  resizeMode="contain"
                  source={require('../../image/product/favorite-empty.png')}
                />
                <View className="absolute w-3/4 px-10 h-40 top-2/4 mt-3 justify-center items-center">
                  <Text className="text-lg text-black font-bold">
                    Không có mục yêu thích
                  </Text>
                  <Text className="text-center font-medium pt-1">
                    Bạn có thể thêm một mục vào mục yêu thích của mình bằng cách
                    nhấp vào "Trái tim"
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="bg-[#FF0000] px-10 py-3 mt-3 rounded-3xl">
                    <Text className="text-white font-bold">Trở lại</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
