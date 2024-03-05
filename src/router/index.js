import React, {useState, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import authStack from './authStack';
import mainStack from './mainStack';
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();
function Navigation() {
  const userData = useSelector((state) => state.authReducer.userData);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
       {!!userData && userData.token
        ? mainStack(Stack)
        : authStack(Stack)}
    </Stack.Navigator>
  );
}

export default Navigation;
