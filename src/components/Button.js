import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

export default function Button({label, onPress, ...props}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      {...props}
      className="mb-[20px] w-[100%] rounded-[10px] items-center justify-center h-[55px] bg-[#FF0000]">
      <Text className="text-white text-lg font-bold">{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
