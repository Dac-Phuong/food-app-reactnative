import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {baseUrl} from '../../../api';
import Icon from 'react-native-vector-icons/dist/Entypo';
import Feather from 'react-native-vector-icons/dist/Feather';
import {TextInput} from 'react-native';

export default function ProductAllSeller({route, navigation}) {
  const imagePath = 'uploads/';
  const {width} = Dimensions.get('window');
  const cardWidth = width / 2 - 18;
  const data = route?.params?.paramKey;
  const [products, setProducts] = useState(route?.params?.paramKey);
  const [search, setSearch] = useState();

  const onSearch = text => {
    if (text == '') {
      setProducts(data);
    } else {
      let tempList = products.filter(item => {
        return item.name.toLowerCase().indexOf(text.toLowerCase()) > -1;
      });
      setProducts(tempList);
    }
  };
  return (
    <View className="flex-1 justify-center bg-white">
      <View className="p-[10px]">
        <View className="w-[100%] relative justify-center items-center ml-auto mr-auto">
          <View className=" absolute left-2 ">
            <TouchableOpacity
              style={{
                elevation: 4,
              }}
              className="w-[40px]  items-center bg-white rounded-[10px] justify-center h-[40px]"
              onPress={() => navigation.goBack()}>
              <Icon name="chevron-small-left" color={'#000'} size={30} />
            </TouchableOpacity>
          </View>
          <Text className="text-xl  text-[#000]">Món ăn bán chạy</Text>
        </View>
        <View className="w-full items-center mt-5 relative  flex-row">
          <View className="w-full items-center pl-2 rounded-[10px] h-[50px] bg-[#F5F3F6] flex-row">
            <Feather name="search" color={'#CCC'} size={24} />
            <TextInput
              value={search}
              onChangeText={text => {
                onSearch(text);
                setSearch(text);
              }}
              className="w-full h-full"
              placeholder="Tìm kiếm..."
            />
          </View>
        </View>
      </View>
      <FlatList
        numColumns={2}
        data={products}
        keyExtractor={(item, index) => item.id}
        className="flex-1 "
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProductDetail', {
                paramKey: item,
              })
            }
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
              <TouchableOpacity className="w-[40px] items-center justify-center h-[40px] rounded-[20PX] bg-[#FF0000]">
                <MaterialCommunityIcons
                  name="cart-variant"
                  color={'#fff'}
                  size={25}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
      {products.length == 0 && (
        <Text className="justify-center text-center items-center text-red-600 h-2/4">
          Không tìm thấy sản phẩm.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
