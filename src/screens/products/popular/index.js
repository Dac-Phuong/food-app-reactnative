import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import API, {baseUrl} from '../../../api';
import {REQUEST_API} from '../../../api/method';
import {useNavigation} from '@react-navigation/native';
export default function ProductsPopular() {
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState([]);
  const navigation = useNavigation();
  const getData = async () => {
    try {
      const url = API.getProductsPopular();
      const [res] = await Promise.all([
        REQUEST_API({
          url: url,
          method: 'get',
        }),
      ]);
      if (res.data) {
        setData(res?.data?.slice(0, 2));
        setNewData(res?.data);
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
        <Text className="text-lg font-medium text-black">
          Thực đơn bữa ăn phổ biến
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ProductAllPopular', {
              paramKey: newData,
            })
          }>
          <Text className="text-red-600">Xem tất cả</Text>
        </TouchableOpacity>
      </View>
      <View className="p-3 pt-0">
        {data.map((item, index) => {
          const imagePath = 'uploads/';
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ProductDetail', {
                  paramKey: item,
                })
              }
              key={item.id}
              style={{
                height: 100,
                marginBottom: 10,
                borderRadius: 8,
                flexDirection: 'row',
                padding: 6,
                shadowOffset: {
                  width: 1,
                  height: 3,
                },
                shadowOpacity: 0.17,
                shadowRadius: 4.65,
                elevation: 5,
                backgroundColor: '#FFF',
                marginVertical: 5,
                justifyContent: 'space-between',
              }}>
              <Image
                style={{
                  borderRadius: 6,
                  width: '25%',
                }}
                resizeMode="cover"
                source={{uri: `${baseUrl}${imagePath}${item.image}`}}
              />
              <View className="w-4/5 pl-2">
                <Text numberOfLines={1} className="text-base font-bold text-black">
                  {item.name}
                </Text>
                <Text numberOfLines={2}>{item.gram}</Text>
                <Text className="text-lg font-bold text-red-600">
                  {item.price?.toLocaleString('vi-VN')}đ
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
