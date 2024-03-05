import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  Permissions,
  Platform,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/dist/Entypo';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Input from '../../components/Input';
import Button from '../../components/Button';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import {useNavigation} from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useSelector} from 'react-redux';
import {saveUserData} from '../../redux/actions';
import axios from 'axios';
import {AlertOnly} from '../../components/alert';
import API, {baseUrl} from '../../api';

export default function EditAccount() {
  const navigation = useNavigation();
  const userData = useSelector(state => state.authReducer.userData);
  const [imageSource, setImageSource] = useState(userData.customer.avatar);
  const [inputs, setInputs] = useState({
    email: userData?.customer?.email,
    full_name: userData?.customer?.full_name,
    phone: userData?.customer?.phone,
    password: '',
  });
  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const PickerCamera = async () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 200,
      maxHeight: 200,
      quality: 0.8,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const selectedImage = response.assets[0].uri;
        setImageSource(selectedImage);
        this.RBSheet.close();
      }
    });
  };
  const PickerImage = async () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 200,
      maxHeight: 200,
      quality: 0.8,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const selectedImage = response.assets[0].uri;
        setImageSource(selectedImage);
        this.RBSheet.close();
      }
    });
  };
  console.log(imageSource);
  const updateCustomer = async () => {
    try {
      const url = API.updateCustomer();
      const formData = new FormData();
      formData.append('customer_id', userData.customer.id);
      formData.append('email', inputs.email);
      if (!userData?.customer?.avatar) {
        formData.append('avatar', {
          uri: imageSource,
          type: 'image/jpeg',
          name: 'photo.jpg',
        });
      }
      formData.append('full_name', inputs.full_name);
      formData.append('phone', inputs.phone);
      formData.append('password', inputs.password);

      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const result = response.data;
      saveUserData(result.data);
      AlertOnly('Sửa thông tin thành công. Vui lòng đăng nhập lại');
    } catch (error) {
      AlertOnly(error);
    }
  };
  return (
    <SafeAreaView className="flex-1 overflow-hidden bg-white">
      <ScrollView className="flex-1">
        <View className="p-4">
          <View className="flex-row  items-center justify-center">
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
            <Text className="text-xl  text-[#000]">
              Sửa thông tin tài khoản
            </Text>
          </View>
          <View className=" w-full mt-[15%] items-center">
            <View
              style={{
                shadowOffset: {
                  width: 1,
                  height: 3,
                },
                shadowOpacity: 0.17,
                shadowRadius: 4.65,
                elevation: 10,
                backgroundColor: '#FFF',
                borderRadius: 10,
                borderColor: '#FFF',
              }}
              className="w-[100px] border-2 relative  h-[100px] rounded-xl">
              <Image
                className="w-fll h-full rounded-[10px]"
                resizeMode="cover"
                source={
                  imageSource
                    ? {uri: `${baseUrl}storage/${imageSource}`}
                    : {
                        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDJzEaxLN-jGRYYUO65pWu7Q9GXoNt4LUSSA&usqp=CAU',
                      }
                }
              />
            </View>
            <TouchableOpacity
              onPress={() => this.RBSheet.open()}
              className="absolute bottom-0 z-20 right-[36%] w-[25px] h-[25px] items-center justify-center rounded-[12px] bg-[#FF0000]">
              <AntDesign name="camera" color="#FFF" size={15} />
            </TouchableOpacity>
          </View>
          <View className="pt-16 h-full">
            <View className="pb-4">
              <Input
                placeholder="Nhập họ và tên"
                label={'Họ và tên'}
                value={inputs.full_name}
                onChangeText={text => handleOnchange(text, 'full_name')}
              />
            </View>
            <View className="pb-4">
              <Input
                placeholder="Nhập địa chỉ email"
                label={'Địa chỉ email'}
                value={inputs.email}
                onChangeText={text => handleOnchange(text, 'email')}
              />
            </View>
            <View className="pb-4">
              <Input
                placeholder="Nhập số điện thoại "
                label={'Số điện thoại'}
                value={inputs.phone}
                onChangeText={text => handleOnchange(text, 'phone')}
              />
            </View>
            <View className="pb-4">
              <Input
                placeholder="Nhập mật khẩu nếu muốn thay đổi"
                label={'Đổi mật khẩu'}
                value={inputs.address}
                onChangeText={text => handleOnchange(text, 'address')}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <RBSheet
        ref={ref => {
          this.RBSheet = ref;
        }}
        height={300}
        openDuration={250}
        customStyles={{
          container: {
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}>
        <View className="w-full h-full p-3">
          <View style={styles.modalView}>
            <Text className="text-center font-bold text-lg mt-2">
              Tải ảnh lên
            </Text>
            <Text className="pt-2 pb-2 mb-3 text-center text-slate-400">
              Chọn ảnh hồ sơ của bạn
            </Text>
            <Button onPress={PickerCamera} label={'Chụp hình'} />
            <View className="-mt-3">
              <Button onPress={PickerImage} label={'Chọn từ thư viện'} />
            </View>
            <View className="-mt-3">
              <Button onPress={() => this.RBSheet.close()} label={'Hủy'} />
            </View>
          </View>
        </View>
      </RBSheet>
      <View className="p-4 pb-0">
        <Button label={'Lưu'} onPress={() => updateCustomer()} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
