import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, useWindowDimensions, StyleSheet, Alert} from 'react-native';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Home from '../screens/home';
import Favorite from '../screens/favorite';
import Cart from '../screens/cart';
import Notification from '../screens/notify';
import Account from '../screens/account';
import {useSelector} from 'react-redux';
import Chat from '../screens/chat';

const Tab = createBottomTabNavigator();

export default function MyTabs({}) {
  const cartData = useSelector(state => state.cartReducer.cartData);
  const favoriteData = useSelector(state => state.favoriteReducer.favoriteData);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingVertical: 10,
          paddingBottom: 10,
          backgroundColor: '#fff',
          height: 65,
          shadowOpacity: 0.15,
          alignItems: 'center',
        },
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.btn}>
              <Entypo
                name="home"
                color={focused ? '#FF0000' : '#ccc'}
                size={25}
              />
            </View>
          ),
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.btn}>
              <AntDesign
                name="heart"
                color={focused ? '#FF0000' : '#ccc'}
                size={25}
              />
              <View style={styles.number}>
                <Text className="text-white text-xs">{favoriteData ? favoriteData.length : 0}</Text>
              </View>
            </View>
          ),
        }}
        name="Favorite"
        component={Favorite}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.btn}>
              <MaterialIcons
                name="shopping-cart"
                color={focused ? '#FF0000' : '#ccc'}
                size={25}
              />
              <View style={styles.number}>
                <Text className="text-white text-xs">
                  {cartData ? cartData.length : 0}
                </Text>
              </View>
            </View>
          ),
        }}
        name="Cart"
        component={Cart}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.btn}>
              <Ionicons
                name="chatbubble-ellipses-sharp"
                color={focused ? '#FF0000' : '#ccc'}
                size={25}
              />
            </View>
          ),
        }}
        name="Chat"
        component={Chat}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.btn}>
              <FontAwesome
                name="user"
                color={focused ? '#FF0000' : '#ccc'}
                size={25}
              />
            </View>
          ),
        }}
        name="Account"
        component={Account}
      />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  btn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'red',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: 11,
    top: 10,
    borderColor:"#fff",
    borderWidth:0.5
  },
});
