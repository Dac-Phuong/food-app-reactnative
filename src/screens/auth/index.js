import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Loader from '../../components/loader';
import API from '../../api';
import {AlertOnly} from '../../components/alert';
import {REQUEST_API} from '../../api/method';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {saveUserData} from '../../redux/actions/index';
const Register = ({navigation}) => {
  const [isShow, setIsShow] = useState(true);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    email: '',
    full_name: '',
    password: '',
  });

  const submitAuth = () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.full_name && isShow) {
      handleError('Please enter input fullname', 'full_name');
      isValid = false;
    }
    if (!inputs.email) {
      handleError('Please enter input email', 'email');
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('Please input a valid email', 'email');
      isValid = false;
    }
    if (!inputs.password) {
      handleError('Please enter input password', 'password');
      isValid = false;
    } else if (inputs.password.length < 6) {
      handleError('Min password length of 6', 'password');
      isValid = false;
    }
    if (isValid) {
      authApi();
    }
  };
  const authApi = async () => {
    if (!isShow) {
      try {
        const url = API.login();
        setLoading(true);
        const [res] = await Promise.all([
          REQUEST_API({
            url: url,
            method: 'post',
            data: {
              email: inputs.email,
              password: inputs.password,
            },
          }),
        ]);
        if (res.data) {
          const dataUser = JSON.stringify(res?.data);
          const token = JSON.stringify(res?.data?.token);
          await AsyncStorage.setItem('userData', dataUser);
          await AsyncStorage.setItem('token', token);
          saveUserData(res?.data);
          setLoading(false);
        } else {
          AlertOnly(res.message);
          console.log(res.message);
          setLoading(false);
        }
      } catch (error) {
        AlertOnly(error.message);
        console.log(error);
        setLoading(false);
      }
    } else {
      try {
        const url = API.register();
        setLoading(true);
        const [res] = await Promise.all([
          REQUEST_API({
            url: url,
            method: 'post',
            data: {
              full_name: inputs.full_name,
              email: inputs.email,
              password: inputs.password,
            },
          }),
        ]);
        if (res.status) {
          setLoading(false);
          AlertOnly('Đăng ký thành công');
          setIsShow(false);
        } else {
          AlertOnly(res.message);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        AlertOnly(error.message);
      }
    }
  };

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({
      ...prevState,
      [input]: text,
    }));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({
      ...prevState,
      [input]: error,
    }));
  };

  return (
    <KeyboardAvoidingView className="flex-1 bg-white">
      <TouchableWithoutFeedback className="flex-1 " onPress={Keyboard.dismiss}>
        <SafeAreaView
          style={{
            marginTop: StatusBar.currentHeight,
          }}
          className="flex-1 bg-white">
          <Loader visible={loading} />
          <ScrollView>
            <View className="">
              <View className="items-center justify-center">
                <View>
                  <Image
                    style={styles.image}
                    className=" items-center justify-center"
                    resizeMode="cover"
                    source={require('../../image/onboarding/Illustration.png')}
                  />
                </View>
                <View className="w-full mt-[-45%] p-4 bg-white">
                  <View className="items-center">
                    <Text className="text-center mt-1 mb-7 rounded-sm w-10 h-1 bg-rose-400"></Text>
                  </View>
                  <View className="flex-row mb-8 px-5">
                    <TouchableOpacity
                      className="w-2/4"
                      onPress={() => setIsShow(true)}>
                      <Text
                        style={{color: isShow ? '#FF0000' : 'black'}}
                        className="text-lg relative font-bold">
                        Create Account
                      </Text>
                      {isShow && (
                        <Text
                          className="text-center absolute rounded-sm w-20 -bottom-2 left-5 h-1"
                          style={{backgroundColor: '#FF0000'}}></Text>
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="w-2/4"
                      onPress={() => setIsShow(false)}>
                      <Text
                        className="text-lg relative pl-20 font-bold"
                        style={{color: !isShow ? '#FF0000' : 'black'}}>
                        Login
                      </Text>
                      {!isShow && (
                        <Text
                          className="text-center absolute rounded-sm w-10 -bottom-2 right-9 h-1 "
                          style={{backgroundColor: '#FF0000'}}></Text>
                      )}
                    </TouchableOpacity>
                  </View>
                  <View>
                    {isShow && (
                      <View>
                        <Input
                          label={'Full name'}
                          onFocus={() => handleError(null, 'full_name')}
                          onChangeText={text =>
                            handleOnchange(text, 'full_name')
                          }
                          placeholder="Full Name"
                          error={errors.full_name}
                        />
                        {errors.full_name && (
                          <Text className="text-[#FF0000] text-sm text-left font-medium pt-1">
                            {errors.full_name}
                          </Text>
                        )}
                      </View>
                    )}
                    <View className="w-full mt-[10px]">
                      <Input
                        label={'Email address'}
                        onFocus={() => handleError(null, 'email')}
                        onChangeText={text => handleOnchange(text, 'email')}
                        placeholder="Email"
                        error={errors.email}
                      />
                      {errors.email && (
                        <Text className="text-[#FF0000] text-sm text-left font-medium pt-1">
                          {errors.email}
                        </Text>
                      )}
                    </View>
                    <View className="w-full mt-[10px]">
                      <Input
                        label={'Password'}
                        onFocus={() => handleError(null, 'password')}
                        onChangeText={text => handleOnchange(text, 'password')}
                        password
                        placeholder="Password"
                        error={errors.password}
                      />
                      {errors.password && (
                        <Text className="text-[#FF0000] text-sm text-left font-medium pt-1">
                          {errors.password}
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
              </View>
              <View className="pt-5 w-full items-center p-4">
                <Button
                  onPress={() => submitAuth()}
                  label={isShow ? 'Sign up' : 'Login'}
                />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({});
