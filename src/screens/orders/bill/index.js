import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  TextInput,
  ScrollView,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/dist/Entypo';
import API from '../../../api';
import {REQUEST_API} from '../../../api/method';
import {useSelector} from 'react-redux';
import {AlertOnly} from '../../../components/alert';
import Button from '../../../components/Button';
import Textarea from 'react-native-textarea';

export default function GetBill({navigation}) {
  const [notes, setNotes] = useState();
  const [data, setData] = useState([]);
  const [firstApiCall, setFirstApiCall] = useState(true);
  const [loading, setLoading] = useState(false);
  const userData = useSelector(state => state.authReducer.userData);
  const [idPayChoose, setIdPayChoose] = React.useState(0);
  const tax = 16000;
  const [paymentCheck, setPaymentCheck] = useState([
    {
      title: 'Thanh toán khi giao hàng',
      check: true,
      id: 0,
    },
    {
      title: 'Thanh toán qua ngân hàng',
      check: false,
      id: 1,
    },
  ]);

  const calculateTotalMoney = () => {
    return data?.cart?.reduce(
      (total, product) => total + product.total_money,
      0,
    );
  };
  const chooseMethod = (item, index) => {
    let copied = [...paymentCheck];
    copied.map((e, i) => {
      if (item.title === e.title) {
        e.check = true;
      } else {
        e.check = false;
      }
    });
    setPaymentCheck(copied);
    setIdPayChoose(item.id);
  };
  const getBill = async () => {
    try {
      if (firstApiCall) {
        setLoading(true);
      }
      const url = API.getBill(userData.customer.id);
      const [res] = await Promise.all([
        REQUEST_API({
          url: url,
          method: 'get',
        }),
      ]);
      if (res.data) {
        setLoading(false);
        setData(res.data);
      } else {
        setLoading(false);
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
    getBill();
  }, []);

  const placeOrder = async () => {
    try {
      const url = API.placeOrder();
      const [res] = await Promise.all([
        REQUEST_API({
          url: url,
          method: 'post',
          data: {
            customer_id: userData?.customer?.id,
            payment_method: idPayChoose,
            note: notes,
          },
        }),
      ]);
      if (res.message) {
        navigation.navigate('DoneOrder');
      } else {
        AlertOnly(res.message);
      }
    } catch (error) {
      AlertOnly(error.message);
    }
  };
  return (
    <SafeAreaView className="flex-1 overflow-hidden bg-white">
      {loading ? (
        <View className="absolute bg-white top-0 bottom-0 left-0 right-0 justify-center items-center">
          <View className="flex-row justify-center items-center">
            <ActivityIndicator size="small" color={'red'} />
            <Text style={{marginLeft: 10, fontSize: 16}}>Loading...</Text>
          </View>
        </View>
      ) : (
        <View className="flex-1">
          <ScrollView className=" flex-1 ">
            <View className=" flex-1 relative">
              <View className="flex-row p-3 items-center justify-center">
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
                <Text className="text-xl text-black">Thống kê đơn hàng</Text>
              </View>
              <View className="mt-1 p-3 flex-1">
                <View className="flex-row">
                  <Text className="font-medium text-base">Khách hàng: </Text>
                  <Text
                    className="font-medium text-base"
                    style={{paddingLeft: 72}}>
                    {data?.customer?.full_name}
                  </Text>
                </View>
                <View className="flex-row pt-1">
                  <Text className="font-medium text-base">Số điện thoại: </Text>
                  <Text className="font-medium text-base ml-16">
                    {data?.address?.phone}
                  </Text>
                </View>
                <View className="flex-row pt-1">
                  <Text className="font-medium text-base">
                    Địa chỉ nhận hàng:
                  </Text>
                  <Text className="font-medium text-base ml-8 w-2/4">
                    {data?.address?.address}
                  </Text>
                </View>
              </View>
              <View className="mx-2 mt-2">
                <View
                  style={{borderTopLeftRadius: 8, borderTopRightRadius: 8}}
                  className="flex-row items-center bg-[#FF0000] px-3">
                  <View
                    style={{width: '8%'}}
                    className="items-center justify-center py-2">
                    <Text className="text-center text-white font-bold">
                      STT
                    </Text>
                  </View>
                  <View
                    style={{width: '30%'}}
                    className="items-center justify-center py-2">
                    <Text className="text-center text-white font-bold">
                      Tên món ăn
                    </Text>
                  </View>
                  <View
                    style={{width: '20%'}}
                    className="items-center justify-center py-2">
                    <Text className="text-center text-white font-bold">
                      Số lượng
                    </Text>
                  </View>
                  <View
                    style={{width: '15%'}}
                    className="items-center justify-center py-2">
                    <Text className="text-center text-white font-bold">
                      Giá
                    </Text>
                  </View>
                  <View
                    style={{width: '30%'}}
                    className="items-center justify-center py-2">
                    <Text className="text-center text-white font-bold">
                      Thành tiền
                    </Text>
                  </View>
                </View>
              </View>
              {data?.cart?.map((item, index) => {
                return (
                  <View className="mx-2 flex-row" key={item.id}>
                    <View
                      style={{
                        width: '8%',
                        borderBottomWidth: 0.5,
                        borderColor: '#ccc',
                      }}
                      className="items-center justify-center py-2">
                      <Text className="text-center text-black font-normal">
                        {++index}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '30%',
                        borderBottomWidth: 0.5,
                        borderColor: '#ccc',
                      }}
                      className="items-center justify-center py-2">
                      <Text className="text-center text-black font-normal">
                        {item.product.name}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '20%',
                        borderBottomWidth: 0.5,
                        borderColor: '#ccc',
                      }}
                      className="items-center justify-center py-2">
                      <Text className="text-center text-black font-normal">
                        {item.quantity}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '15%',
                        borderBottomWidth: 0.5,
                        borderColor: '#ccc',
                      }}
                      className="items-center justify-center py-2">
                      <Text className="text-center text-black font-normal">
                        {item?.product?.price?.toLocaleString('vi-VN')}đ
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '30%',
                        borderBottomWidth: 0.5,
                        borderColor: '#ccc',
                      }}
                      className="items-center justify-center py-2">
                      <Text className="text-center text-black font-normal">
                        {item?.total_money?.toLocaleString('vi-VN')}đ
                      </Text>
                    </View>
                  </View>
                );
              })}
              <View className="p-3">
                <View className="flex-row pt-1 justify-between">
                  <Text className="font-normal text-base">Tổng phụ:</Text>
                  <Text className="font-medium text-base text-red-600">
                    {calculateTotalMoney()?.toLocaleString('vi-VN')}đ
                  </Text>
                </View>
                <View className="flex-row pt-1 justify-between">
                  <Text className="font-normal text-base">Phí giao hàng:</Text>
                  <Text className="font-medium text-base text-red-600">
                    {tax.toLocaleString('vi-VN')}đ
                  </Text>
                </View>
                <View className="flex-row pt-1 justify-between">
                  <Text className="font-normal text-base">Chiết khấu:</Text>
                  <Text className="font-medium text-base text-red-600">0%</Text>
                </View>
                <View className="flex-row pt-1 justify-between">
                  <Text className="font-bold text-base text-red-600">
                    Tổng tiền:
                  </Text>
                  <Text className="font-bold text-base text-red-600">
                    {(calculateTotalMoney() + tax)?.toLocaleString('vi-VN')}đ
                  </Text>
                </View>
                <View className="mt-2">
                  <Text className="font-bold my-2 text-base">
                    Chọn phương thức thanh toán
                  </Text>
                  {paymentCheck.map((item, index) => {
                    return (
                      <TouchableWithoutFeedback
                        onPress={() => chooseMethod(item, index)}
                        key={index}>
                        <View className="flex-row items-center mb-2">
                          <Image
                            source={
                              item.check
                                ? require('../../../image/product/iconRadioCheck.png')
                                : require('../../../image/product/iconRadioUnCheck.png')
                            }
                            style={item.check ? styles.iconCheck : styles.ic}
                          />
                          <Text
                            style={styles.nameCheck}
                            className="text-center text-black font-normal">
                            {item.title}
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                    );
                  })}
                </View>
                <View>
                  {idPayChoose == 1 && (
                    <View>
                      <View className="flex-row">
                        <Text className="text-base font-normal mr-1">
                          Ngân hàng:{' '}
                        </Text>
                        <Text className="text-base font-normal">
                          Vietinbank
                        </Text>
                      </View>
                      <View className="flex-row">
                        <Text className="text-base font-normal mr-1">
                          Số tài khoản:{' '}
                        </Text>
                        <Text className="text-base font-normal">
                          104869516952
                        </Text>
                      </View>
                      <View className="flex-row">
                        <Text className="text-base font-normal mr-1">
                          Chủ tài khoản:{' '}
                        </Text>
                        <Text className="text-base font-normal">
                          TRAN VAN TOAN
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
                <Text className="py-2 font-bold text-base">
                  {' '}
                  Ghi chú đơn hàng
                </Text>
                <Textarea
                  containerStyle={styles.textareaContainer}
                  style={styles.textarea}
                  onChangeText={text => setNotes(text)}
                  maxLength={200}
                  defaultValue={notes}
                  placeholder={'Ghi chú đơn hàng... '}
                  placeholderTextColor={'#c7c7c7'}
                  underlineColorAndroid={'transparent'}
                />
              </View>
            </View>
          </ScrollView>
          <View className="p-3">
            <Button onPress={() => placeOrder()} label={'Đặt ngay'} />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  iconCheck: {
    tintColor: '#FA4A0C',
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10,
  },
  ic: {
    tintColor: '#25282B',
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10,
  },
  textareaContainer: {
    height: 120,
    padding: 5,
    backgroundColor: '#F5F5F5',
    borderWidth: 0.5,
    borderColor: '#ccc',
  },
  textarea: {
    textAlignVertical: 'top',
    height: 120,
    fontSize: 14,
    color: '#333',
  },
});
