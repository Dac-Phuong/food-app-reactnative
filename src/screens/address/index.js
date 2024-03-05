import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/dist/Entypo';
import RBSheet from 'react-native-raw-bottom-sheet';
import Button from '../../components/Button';
import Textarea from 'react-native-textarea';
import CheckBox from 'react-native-check-box';
import API from '../../api';
import {REQUEST_API} from '../../api/method';
import {useSelector} from 'react-redux';
import {AlertOnly} from '../../components/alert';
export default function Address({navigation}) {
  const [isChecked, setIsCheck] = useState(true);
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [address_id, setAddress_id] = useState();
  const [data, setData] = useState([]);
  const [firstApiCall, setFirstApiCall] = useState(true);
  const [loading, setLoading] = useState(false);
  const userData = useSelector(state => state.authReducer.userData);
  const getAddress = async () => {
    try {
      if (firstApiCall) {
        setLoading(true);
      }
      const url = API.getAddress(userData.customer.id);
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
    getAddress();
  }, []);
  const addAddress = async () => {
    if (!phone) {
      AlertOnly('Vui lòng nhập số điện thoại');
    } else if (!address) {
      AlertOnly('Vui lòng nhập địa chỉ giao hàng');
    } else {
      try {
        const url = API.addAddress();
        const [res] = await Promise.all([
          REQUEST_API({
            url: url,
            method: 'post',
            data: {
              customer_id: userData.customer.id,
              address: address,
              phone: phone,
              active: isChecked ? 1 : 0,
            },
          }),
        ]);
        if (res.message) {
          AlertOnly(res.message);
          setPhone();
          this.RBSheet.close();
        } else {
          AlertOnly(res.message);
        }
      } catch (error) {
        AlertOnly(error.message);
      }
    }
  };
  const getUpdateAddress = async id => {
    try {
      const url = API.getUpdateAddress(id);
      setAddress_id(id);
      const [res] = await Promise.all([
        REQUEST_API({
          url: url,
          method: 'get',
        }),
      ]);
      if (res.data) {
        this.RBSheet.open();
        setPhone(res.data.phone);
        setAddress(res.data.address);
        setIsCheck(res.data.active == 1 ? true : false);
      } else {
        AlertOnly(res.message);
      }
    } catch (error) {
      AlertOnly(error.message);
    }
  };
  const updateAddress = async () => {
    if (!phone) {
      AlertOnly('Vui lòng nhập số điện thoại');
    } else if (!address) {
      AlertOnly('Vui lòng nhập địa chỉ giao hàng');
    } else {
      try {
        const url = API.updateAddress();
        const [res] = await Promise.all([
          REQUEST_API({
            url: url,
            method: 'post',
            data: {
              address_id: address_id,
              customer_id: userData.customer.id,
              address: address,
              phone: phone,
              active: isChecked ? 1 : 0,
            },
          }),
        ]);
        if (res.message) {
          AlertOnly(res.message);
          getAddress();
          this.RBSheet.close();
        } else {
          AlertOnly(res.message);
        }
      } catch (error) {
        AlertOnly(error.message);
      }
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
            <Text className="text-xl text-[#000]">Địa chỉ giao hàng của tôi</Text>
          </View>
          <View className="mt-2 flex-1">
            <ScrollView className="flex-1">
              {data.map(item => {
                return (
                  <TouchableOpacity
                    onPress={() => getUpdateAddress(item.id)}
                    key={item.id}
                    className="m-3 my-2 bg-white rounded-lg p-3"
                    style={{
                      shadowOffset: {
                        width: 1,
                        height: 3,
                      },
                      shadowOpacity: 0.17,
                      shadowRadius: 4.65,
                      elevation: 7,
                    }}>
                    {item.active == '1' && (
                      <Text className="text-red-600">Mặc định</Text>
                    )}
                    <Text>Số điện thoại: {item.phone}</Text>
                    <Text className="pt-1" style={{lineHeight: 20}}>
                      Địa chỉ giao hàng: {item.address}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
          <RBSheet
            ref={ref => {
              this.RBSheet = ref;
            }}
            height={400}
            openDuration={250}
            customStyles={{
              container: {
                justifyContent: 'center',
                alignItems: 'center',
              },
            }}>
            <View className="bg-white p-4 flex-1">
              <View className="flex-row pt-2 justify-between">
                <Text className="text-lg font-bold text-black">
                  Địa chỉ giao hàng
                </Text>
              </View>
              <TextInput
                style={{
                  height: 45,
                  backgroundColor: '#F5F5F5',
                  borderWidth: 0.5,
                  borderColor: '#ccc',
                  marginTop: 10,
                  marginBottom: 5,
                  paddingLeft: 10,
                }}
                value={phone}
                onChangeText={text => setPhone(text)}
                keyboardType="numeric"
                placeholder="Nhập số điện thoại"
              />
              <View className="pt-2 justify-between">
                <Textarea
                  containerStyle={styles.textareaContainer}
                  style={styles.textarea}
                  onChangeText={text => setAddress(text)}
                  maxLength={200}
                  defaultValue={address}
                  placeholder={'Nhập chi tiết địa chỉ giao hàng'}
                  placeholderTextColor={'#c7c7c7'}
                  underlineColorAndroid={'transparent'}
                />
              </View>
              <View className="flex-row items-center pt-3 ">
                <CheckBox
                  uncheckedCheckBoxColor={'red'}
                  checkedCheckBoxColor={'red'}
                  onClick={() => {
                    setIsCheck(!isChecked);
                  }}
                  isChecked={isChecked}
                />
                <Text className="text-base ml-2 text-[#FF0000] font-normal">
                  Đặt làm mặc định
                </Text>
              </View>
              <View className="pt-2">
                <View className="flex-row pt-6 justify-between">
                  <Button
                    label={'Lưu'}
                    onPress={() => {
                      address_id ? updateAddress() : addAddress();
                    }}
                  />
                </View>
              </View>
            </View>
          </RBSheet>
          <TouchableOpacity
            onPress={() => [
              this.RBSheet.open(),
              setAddress(),
              setIsCheck(true),
              setPhone(),
              setAddress_id(),
            ]}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'red',
              marginRight: 30,
              borderRadius: 25,
              width: 50,
              height: 50,
              right: 0,
              bottom: 50,
              elevation: 5,
              position: 'absolute',
            }}>
            <Text className="text-3xl text-white">+</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textareaContainer: {
    height: 150,
    padding: 5,
    backgroundColor: '#F5F5F5',
    borderWidth: 0.5,
    borderColor: '#ccc',
  },
  textarea: {
    textAlignVertical: 'top',
    height: 170,
    fontSize: 14,
    color: '#333',
  },
});
