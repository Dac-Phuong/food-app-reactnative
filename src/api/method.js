import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveUserData } from '../redux/actions';

const REQUEST_API = async ({url, method, data, token}) => {
  const Token = await AsyncStorage.getItem('token');
  const cleanedToken = Token ? Token.replace(/"/g, '') : '';
  const headers = {
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${cleanedToken}`,
  };
  const config = {method, url, data, headers};
  try {
    const res = await axios(config);
    if (res.status === 200) {
      return res.data;
    }
  } catch (e) {
    if (String(e).indexOf('Network Error') !== -1) {
      throw new Error('Không có internet');
    }
    // else if (
    //   e.message.indexOf('Request failed with status code 400') !== -1
    // ) {
    //   throw new Error('Vui lòng đăng nhập.');
    // }
    else {
      // saveUserData(null);
      // await AsyncStorage.removeItem('userData');
      throw new Error(e);
    }
  }
};

export {REQUEST_API};
