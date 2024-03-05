import {
  Platform,
  Text,
  View,
  TouchableOpacity,
  Image,
  Linking,
  Alert,
} from 'react-native';
import React from 'react';
import styles from './styles';
import {AlertOnly} from '../../components/alert';
import Icon from 'react-native-vector-icons/dist/Entypo';

const Chat = ({navigation}) => {
  const ChatZalo = React.useCallback(async phoneNumber => {
    await Linking.openURL(`https://zalo.me/${phoneNumber}`);
  }, []);
  const openCall = phone => {
    Alert.alert('Thông báo', 'Bạn có chắc chắn muốn gọi cho chúng tôi không?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {text: 'OK', onPress: () => calls(phone)},
    ]);
  };
  const calls = async phone => {
    let phoneNumber;
    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${phone}`;
    } else {
      phoneNumber = `tel://${phone}`;
    }
    try {
      await Linking.openURL(phoneNumber);
    } catch (e) {
      AlertOnly('Không thể thực hiện cuộc gọi này, vui lòng thử lại sau');
    }
  };
  const sendWhatsApp = async () => {
    let msg = 'Hello';
    let phoneWithCountryCode = '+84334262754';

    let mobile = phoneWithCountryCode;
    if (mobile) {
      if (msg) {
        let url = 'whatsapp://send?text=' + msg + '&phone=' + mobile;
        try {
          await Linking.openURL(url);
        } catch (error) {
          AlertOnly('Thiết bị chưa cài đặt WhatsApp');
        }
      } else {
        AlertOnly('Vui lòng chèn tin nhắn để gửi');
      }
    } else {
      AlertOnly('Vui lòng nhập số di động');
    }
  };
  return (
    <View style={styles.container}>
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
        <Text className="text-xl  text-[#000]">Liên hệ</Text>
      </View>
      <TouchableOpacity
        style={[styles.item, {marginTop: 5}]}
        onPress={() => calls('0334262754')}>
        <Image
          source={require('../../image/product/iconCalling.png')}
          style={styles.icon}
        />
        <View style={styles.btn}>
          <Text style={styles.txt}>Gọi đến chúng tôi</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.lineSep} />
      <TouchableOpacity
        style={styles.item}
        onPress={() => ChatZalo('0334262754')}>
        <Image
          source={require('../../image/product/zaloIcon.png')}
          style={styles.icon}
        />
        <View style={styles.btn}>
          <Text style={styles.txt}>Liên hệ với chúng tôi qua Zalo</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.lineSep} />
      <TouchableOpacity style={styles.item} onPress={() => sendWhatsApp()}>
        <Image
          source={require('../../image/product/wa.png')}
          style={styles.icon}
        />
        <View style={styles.btn}>
          <Text style={styles.txt}>Liên hệ với chúng tôi qua WhatApp</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Chat;
