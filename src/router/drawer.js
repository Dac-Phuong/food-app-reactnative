import React, {useEffect, useState} from 'react';
import {View, useWindowDimensions, StyleSheet, Alert} from 'react-native';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';

import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerItem,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import MyTabs from './bottomTab';
import UserView from '../components/userView';
import Account from '../screens/account';
import Favorite from '../screens/favorite';
import Cart from '../screens/cart';
import Notification from '../screens/notify';
import {AlertOnly} from '../components/alert';
import API from '../api';
import {REQUEST_API} from '../api/method';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveUserData } from '../redux/actions/index';
import Chat from '../screens/chat';
const Drawer = createDrawerNavigator();

const CustomDrawer = props => {
  const [isloading, setLoading] = useState(false);
  const onLogoutAlert = () => {
    Alert.alert(
      'Đăng xuất',
      'Bạn có chắc chắn muốn đăng xuất khỏi thiết bị này',
      [{text: 'Có', onPress: logout}, {text: 'Không'}],
      {cancelable: true},
    );
  };
  const logout = async () => {
    setLoading(true);
    try {
      const url = API.logout();
      setLoading(true);
      const [res] = await Promise.all([
        REQUEST_API({
          url: url,
          method: 'post',
        }),
      ]);
      if (res.data) {
        await AsyncStorage.removeItem('userData');
        saveUserData([res.data]);
      } else {
        AlertOnly(res.message);
        setLoading(false);
      }
    } catch (error) {
      AlertOnly(error.message);
      setLoading(false);
    }
  };
  return (
    <>
      <View className="flex-1 pl-4 pr-4 bg-[#FFF]">
        <UserView />
        <DrawerContentScrollView>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
        <DrawerItem
          onPress={onLogoutAlert}
          style={{
            borderBottomWidth: 0.5,
            borderColor: 'red',
            marginBottom: 50,
            paddingVertical:10,
            borderTopWidth: 0.5,
          }}
          label="Đăng xuất"
          icon={({color, size}) => (
            <MaterialIcons color={'red'} size={size} name="logout" />
          )}
          labelStyle={{color: 'red'}}
        />
      </View>
    </>
  );
};
export default function DrawerNavigate({...props}) {
  const dimension = useWindowDimensions();
  const drawerType = dimension.width >= 700 ? 'permanent' : 'front';

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: 280,
        },
        drawerActiveBackgroundColor: '#EF0023',
        drawerInactiveTintColor: '#FF000EF00230',
        drawerItemStyle: {
          borderRadius: 8,
        },
      }}
      drawerType={drawerType}
      edgeWidth={20}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="Màn hình chính"
        component={MyTabs}
        options={{
          drawerIcon: ({color, size}) => (
            <Entypo name="home" color={'#fff'} size={size} />
          ),
          drawerLabelStyle: {
            color: '#fff',
          },
        }}
      />
      <Drawer.Screen
        name="Thông tin tài khoản"
        component={Account}
        options={{
          drawerIcon: ({color, size}) => (
            <FontAwesome5 name="user-alt" color={'#000'} size={size} />
          ),
          drawerLabelStyle: styles.drawerLabelStyle,
        }}
      />

      <Drawer.Screen
        name="Danh mục yêu thích"
        component={Favorite}
        options={{
          drawerIcon: ({color, size}) => (
            <AntDesign name="heart" color={'#000'} size={size} />
          ),
          drawerLabelStyle: styles.drawerLabelStyle,
        }}
      />

      <Drawer.Screen
        name="Giỏ hàng"
        component={Cart}
        options={{
          drawerIcon: ({color, size}) => (
            <MaterialIcons name="shopping-cart" color={'#000'} size={size} />
          ),
          drawerLabelStyle: styles.drawerLabelStyle,
        }}
      />

      <Drawer.Screen
        name="Liên hệ"
        component={Chat}
        options={{
          drawerIcon: ({color, size}) => (
            <Ionicons name="chatbubble-ellipses-sharp" color={'#000'} size={size} />
          ),
          drawerLabelStyle: styles.drawerLabelStyle,
        }}
      />
    </Drawer.Navigator>
  );
}
const styles = StyleSheet.create({
  drawerLabelStyle: {
    color: '#000',
  },
});
