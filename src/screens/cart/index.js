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
import API, {baseUrl} from '../../api';
import {REQUEST_API} from '../../api/method';
import {useFocusEffect} from '@react-navigation/native';
import {AlertOnly} from '../../components/alert';
import {useSelector} from 'react-redux';
import {getAddress, saveCartData} from '../../redux/actions/index';
import Button from '../../components/Button';
import RBSheet from 'react-native-raw-bottom-sheet';

export default function Cart({navigation}) {
  const [loading, setLoading] = useState(false);
  const userData = useSelector(state => state.authReducer.userData);
  const addressData = useSelector(state => state.addressReducer.addressData);
  const [data, setData] = useState([]);
  const tax = 16000;
  const [firstApiCall, setFirstApiCall] = useState(true);
  const calculateTotalMoney = () => {
    return data.reduce((total, product) => total + product.total_money, 0);
  };
  const formatNumberWithCommas = number => {
    return number.toLocaleString('vi-VN');
  };
  const getBill = () => {
    if (data.length <= 0) {
      AlertOnly('Vui lòng thêm sản phẩm vào giỏ hàng.');
    } else if (addressData.length <= 0) {
      AlertOnly('Vui lòng thêm địa chỉ giao hàng.');
    } else {
      this.RBSheet.close();
      navigation.navigate('GetBill');
    }
  };
  const getDataCart = async () => {
    try {
      if (firstApiCall) {
        setLoading(true);
      }
      const url = API.cart(userData?.customer?.id);
      const [res] = await Promise.all([
        REQUEST_API({
          url: url,
          method: 'get',
        }),
      ]);
      if (res.data) {
        setData(res.data);
        saveCartData(res.data);
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

  const deleteItemCart = async product_id => {
    try {
      const url = API.deleteItemCart(userData?.customer?.id, product_id);
      const [res] = await Promise.all([
        REQUEST_API({
          url: url,
          method: 'delete',
        }),
      ]);
      if (res.message) {
        AlertOnly(res.message);
        getDataCart();
      } else {
        AlertOnly(res.msg);
      }
    } catch (error) {
      AlertOnly(error.message);
    }
  };
  const increaseItemCart = async id => {
    try {
      const url = API.increase(id);
      const [res] = await Promise.all([
        REQUEST_API({
          url: url,
          method: 'get',
        }),
      ]);
      if (res) {
        getDataCart();
      } else {
        AlertOnly(res.msg);
      }
    } catch (error) {
      AlertOnly(error.message);
    }
  };
  const reduceItemCart = async id => {
    try {
      const url = API.reduce(id);
      const [res] = await Promise.all([
        REQUEST_API({
          url: url,
          method: 'get',
        }),
      ]);
      if (res) {
        getDataCart();
      } else {
        AlertOnly(res.msg);
      }
    } catch (error) {
      AlertOnly(error.message);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getDataCart();
      getAddress(userData?.customer?.id);
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
        <View className="flex-1">
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
            <Text className="text-xl  text-[#000]">Giỏ hàng</Text>
          </View>
          <ScrollView className="w-full flex-1">
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
                    className="h-[120px] mb-1 mt-2 flex-row items-center w-full">
                    <Image
                      resizeMode="cover"
                      style={{
                        borderRadius: 8,
                        width: '28%',
                        height: '100%',
                      }}
                      source={{
                        uri: `${baseUrl}${imagePath}${item.product.image}`,
                      }}
                    />
                    <View className="p-3 w-[72%]">
                      <View className="flex-row justify-between items-center">
                        <Text
                          className="text-lg w-2/3 text-black"
                          numberOfLines={1}>
                          {item.product.name}
                        </Text>
                        <TouchableOpacity
                          onPress={() => deleteItemCart(item.product.id)}
                          className="w-[30px] items-center justify-center h-[30px] rounded-[15px] bg-[#FF0000]">
                          <MaterialCommunityIcons
                            name="delete-outline"
                            color={'#fff'}
                            size={18}
                          />
                        </TouchableOpacity>
                      </View>
                      <Text numberOfLines={2} className="text-sm text-[#ccc]">
                        {item.product.gram}
                      </Text>
                      <View className="flex-row justify-between items-center">
                        <Text className="text-lg font-bold text-[#FF0000]">
                          {formatNumberWithCommas(item.total_money)}đ
                        </Text>
                        <View className="flex-row  items-center -mr-2">
                          <TouchableOpacity
                            onPress={() => reduceItemCart(item.id)}
                            style={styles.btn}>
                            <Text className="font-semibold text-lg">-</Text>
                          </TouchableOpacity>
                          <Text>{item.quantity}</Text>
                          <TouchableOpacity
                            onPress={() => increaseItemCart(item.id)}
                            style={styles.btn}
                            className="bg-[#FF0000]">
                            <Text className="font-semibold text-lg text-white">
                              +
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
            {data.length == 0 && (
              <View className="flex-1 justify-center items-center">
                <Image
                  className="w-full"
                  resizeMode="contain"
                  source={require('../../image/product/cart-empty.jpg')}
                />
              </View>
            )}
            <RBSheet
              ref={ref => {
                this.RBSheet = ref;
              }}
              height={280}
              openDuration={250}
              customStyles={{
                container: {
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              }}>
              <View className="flex-1 bg-white p-4">
                <View className="flex-row pt-2 justify-between">
                  <Text className="text-lg text-black">Tổng phụ</Text>
                  <Text className="text-lg text-[#FF0000] font-normal">
                    {formatNumberWithCommas(calculateTotalMoney())}đ
                  </Text>
                </View>
                <View className="flex-row pt-1 justify-between">
                  <Text className="text-lg text-black">Phí giao hàng</Text>
                  <Text className="text-lg text-[#FF0000] font-normal">
                    {formatNumberWithCommas(tax)}đ
                  </Text>
                </View>
                <View className="flex-row pt-1 justify-between">
                  <Text className="text-lg text-black">Chiết khấu</Text>
                  <Text className="text-lg text-[#FF0000] font-normal">0%</Text>
                </View>
                <View className="flex-row pt-3 justify-between ">
                  <Text className="text-lg font-bold text-black">
                    Tổng tiền
                  </Text>
                  <Text className="text-lg text-[#FF0000] font-bold">
                    {formatNumberWithCommas(calculateTotalMoney() + tax)}đ
                  </Text>
                </View>
                <View style={styles.content}>
                  <View className="pt-3">
                    <View className="flex-row pt-6 justify-between">
                      <Button label={'Xem hóa đơn'} onPress={() => getBill()} />
                    </View>
                  </View>
                </View>
              </View>
            </RBSheet>
          </ScrollView>
          {data.length > 0 && (
            <View className="p-3 pb-0">
              <Button
                label={'Xem tổng tiền'}
                onPress={() => this.RBSheet.open()}
              />
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: 0.5,
    marginHorizontal: 6,
    borderColor: '#ccc',
  },
});
