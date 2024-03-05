import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/dist/Entypo';
import Feather from 'react-native-vector-icons/dist/Feather';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import RBSheet from 'react-native-raw-bottom-sheet';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Slider from '@react-native-community/slider';
import {useSelector} from 'react-redux';
import API, {baseUrl} from '../../api';
import {REQUEST_API} from '../../api/method';
import {addToCart} from '../../redux/actions';
const {width} = Dimensions.get('window');
const cardWidth = width / 2 - 18;
export default function Search({navigation}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [minValue, setMinValue] = useState(1000000);
  const userData = useSelector(state => state.authReducer.userData);
  const category = useSelector(state => state.category.categoryData);
  const [Index, setIndex] = useState(null);
  const [category_id, setCategory_id] = useState(null);
  const [search, setSearch] = useState();
  const [olData, setOlaData] = useState([]);
  const imagePath = 'uploads/';
  const getData = async () => {
    try {
      setLoading(true);
      const url = API.getProductsAll();
      const [res] = await Promise.all([
        REQUEST_API({
          url: url,
          method: 'get',
        }),
      ]);
      if (res.data) {
        setProducts(res.data);
        setOlaData(res.data);
        setLoading(false);
      } else {
        console.log(res.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const handleSliderChange = value => {
    setMinValue(parseFloat(value.toFixed(0)));
  };
  const onSearch = text => {
    if (text == '') {
      setProducts(olData);
    } else {
      let tempList = products.filter(item => {
        return item.name.toLowerCase().indexOf(text.toLowerCase()) > -1;
      });
      setProducts(tempList);
    }
  };
  const filterProducts = async () => {
    try {
      const url = API.getProductsFilter(0, minValue, category_id);
      const [res] = await Promise.all([
        REQUEST_API({
          url: url,
          method: 'get',
        }),
      ]);
      if (res.data) {
        setProducts(res.data);
      } else {
        console.log(res.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <SafeAreaView className=" flex-1 bg-white">
      <GestureHandlerRootView style={{flex: 1}}>
        <View className=" flex-1 bg-white">
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
              <Text className="text-xl  text-[#000]">Tìm kiếm đồ ăn </Text>
            </View>
            <View className="w-full items-center mt-5 relative  flex-row">
              <View className="w-[85%] items-center pl-2 rounded-[10px] h-[50px] bg-[#F5F3F6] flex-row">
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
              <View className="absolute right-0">
                <TouchableOpacity
                  style={{
                    elevation: 10,
                  }}
                  className="w-[40px]  items-center bg-[#FF0000] rounded-[10px] justify-center h-[40px]"
                  onPress={() => this.RBSheet.open()}>
                  <AntDesign name="filter" color={'#fff'} size={18} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {loading ? (
            <View className="absolute bg-white top-0 bottom-0 left-0 right-0 justify-center items-center">
              <View className="flex-row justify-center items-center">
                <ActivityIndicator size="small" color={'red'} />
                <Text style={{marginLeft: 10, fontSize: 16}}>Loading...</Text>
              </View>
            </View>
          ) : (
            <View className="flex-1 justify-between">
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
                        ${item.price.toLocaleString('vi-VN')}
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          addToCart({
                            product_id: item.id,
                            customer_id: userData.customer.id,
                            quantity: 1,
                            total_money: item.price,
                          })
                        }
                        className="w-[40px] items-center justify-center h-[40px] rounded-[20PX] bg-[#FF0000]">
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
          )}
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
            <View className="flex-1 bg-white">
              <View className="justify-center  p-4 items-center">
                <Text className="text-xl text-[#FF0000] ">Lọc sản phẩm</Text>
              </View>
              <View className="flex-row  p-4 justify-between">
                <Text className="text-lg text-black">Phạm vi giá</Text>
                <Text className="text-base text-[#FF0000] font-normal">
                  ${0} - ${minValue?.toLocaleString('vi-VN')}
                </Text>
              </View>
              <View style={styles.content}>
                <Slider
                  minimumValue={0}
                  maximumValue={1000000}
                  value={minValue}
                  minimumTrackTintColor="red"
                  maximumTrackTintColor="#ccc"
                  thumbTintColor="red"
                  onValueChange={handleSliderChange}
                />
                <View className="pt-3">
                  <Text className="text-lg text-black">Danh mục</Text>
                  <View className="flex-row justify-between flex-wrap">
                    {category.map((item, index) => {
                      return (
                        <TouchableOpacity
                          onPress={() => [
                            setIndex(index),
                            setCategory_id(item.id),
                          ]}
                          style={[
                            {
                              borderColor: '#FF0000',
                              borderWidth: 1,
                            },
                            Index === index && {
                              backgroundColor: '#FF0000',
                            },
                          ]}
                          key={item.id}
                          className="w-[30%] mt-2 mr-2 rounded-md h-[35px] justify-center items-center">
                          <Text
                            className="text-sm font-normal"
                            style={[
                              Index === index && {
                                color: '#FFF',
                              },
                            ]}>
                            {item.name}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                  <View className="flex-row pt-6 justify-between">
                    <TouchableOpacity
                      onPress={() => [
                        setIndex(null),
                        setCategory_id(null),
                        setMinValue(1000000),
                      ]}
                      style={{borderColor: '#FF0000', borderWidth: 1}}
                      className="h-[50px] w-[47%] rounded-lg justify-center items-center">
                      <Text className="text-[#FF0000] text-sm font-bold">
                        Clear All
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => [filterProducts(), this.RBSheet.close()]}
                      className="h-[50px] w-[47%] justify-center rounded-lg items-center bg-[#FF0000]">
                      <Text className="text-[#fff] text-sm font-bold">
                        Apply
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </RBSheet>
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    justifyContent: 'space-between',
  },
});
