import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Image,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/dist/Entypo';
import API from '../../api';
import {REQUEST_API} from '../../api/method';
import {useSelector} from 'react-redux';
import {AlertOnly} from '../../components/alert';
import moment from 'moment';
export default function ListOrder({navigation}) {
  const [data, setData] = useState([]);
  const [firstApiCall, setFirstApiCall] = useState(true);
  const [loading, setLoading] = useState(false);
  const userData = useSelector(state => state.authReducer.userData);

  const getOrder = async () => {
    try {
      if (firstApiCall) {
        setLoading(true);
      }
      const url = API.getOrders(userData?.customer?.id);
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
    getOrder();
  }, []);

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
                <Text className="text-xl text-black">Danh sách đơn hàng</Text>
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
                      Ngày mua
                    </Text>
                  </View>
                  <View
                    style={{width: '20%'}}
                    className="items-center justify-center py-2">
                    <Text className="text-center text-white font-bold">
                      Trang thái
                    </Text>
                  </View>
                  <View
                    style={{width: '42%'}}
                    className="items-center justify-center py-2">
                    <Text className="text-center text-white font-bold">
                      Phương thức thanh toán
                    </Text>
                  </View>
                </View>
              </View>
              {data?.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('GetDetailOrder', {
                        paramKey: item.id,
                      })
                    }
                    className="mx-2 flex-row"
                    key={item.id}
                    style={{
                      backgroundColor: index % 2 === 1 ? '#F8F8F8' : '#FFF',
                    }}>
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
                        {moment(item.created_at).format('YYYY-MM-DD')}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '20%',
                        borderBottomWidth: 0.5,
                        borderColor: '#ccc',
                      }}
                      className="items-center justify-center py-2">
                      <Text
                        style={{
                          color:
                            item.status === 0
                              ? '#4263EB'
                              : item.status === 2
                              ? '#2AC769'
                              : item.status === 3
                              ? 'green'
                              : '#FF0000',
                        }}
                        className="text-center text-black font-normal">
                        {item.status == 0
                          ? 'Chờ duyệt'
                          : item.status == 2
                          ? 'Đang giao'
                          : item.status == 3
                          ? 'Giao thành công'
                          : 'Đã hủy'}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '40%',
                        borderBottomWidth: 0.5,
                        borderColor: '#ccc',
                      }}
                      className="items-center justify-center py-2">
                      <Text className="text-center text-black font-normal">
                        {item.payment_method == 1
                          ? 'Thanh toán qua ngân hàng'
                          : 'Thanh toán khi giao hàng'}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
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
