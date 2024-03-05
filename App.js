import React, {useEffect} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-gesture-handler';
import Navigation from './src/router';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {saveUserData} from './src/redux/actions/index';

function App() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem('userData');
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          saveUserData(userData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <View className="flex-1">
      <Provider store={store}>
        <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </Provider>
    </View>
  );
}

export default App;
