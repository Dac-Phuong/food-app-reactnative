import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/dist/Feather';

export default function Input({
  password,
  error,
  label,
  onForcus = () => {},
  ...props
}) {
  const [hidePassword, setHidePassword] = useState(password);
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View>
      <Text className="text-black mb-2 font-medium">{label}</Text>
      <View
        style={[
          {
            borderColor: error ? 'red' : isFocused ? 'blue' : '#ccc',
          },
        ]}
        className="w-[100%] border-[1px] rounded-[6px] h-[55px]">
        <TextInput
          secureTextEntry={hidePassword}
          autoCorrect={false}
          placeholderTextColor="#ccc"
          onFocus={() => {
            onForcus();
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          className="w-full h-full relative pl-3"
          {...props}
        />
        {password && (
          <View className="absolute right-2 top-4">
            <Icon
              onPress={() => setHidePassword(!hidePassword)}
              name={hidePassword ? 'eye-off' : 'eye'}
              size={20}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
