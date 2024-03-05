import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/dist/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';

export default function Notification({navigation}) {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="">
        <View className="flex-row p-4 items-center justify-center">
          <View className="w-[100%] absolute flex-row justify-between items-center ml-auto mr-auto">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                elevation: 5,
                transform: [{rotate: '45deg'}],
              }}
              className="w-[40px] items-center bg-white rounded-[10px] justify-center h-[40px]">
              <Icon
                style={{transform: [{rotate: '-45deg'}]}}
                name="chevron-small-left"
                color={'#000'}
                size={30}
              />
            </TouchableOpacity>
          </View>
          <Text className="text-xl  text-[#000]">Notification</Text>
        </View>
        <ScrollView className="w-full pt-4 h-full">
          <View className="items-center w-full">
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
                width: '94%',
                borderRadius: 10,
              }}
              className="h-[90px] mb-3 mt-3 flex-row items-center w-full">
              <View className="p-3 bg w-[100%]">
                <View className="flex-row justify-between items-center">
                  <Text className="text-lg text-black">WellCome to foodie</Text>
                  <Text className="text-base font-normal text-[#FF0000]">new</Text>
                </View>
                <Text numberOfLines={2} className="text-sm text-[#ccc]">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Iusto dolor quae a et sit nobis sapiente officiis nihil earum,
                  sunt fugit ipsum ad consectetur? Nam neque soluta dolore.
                  Dolorem, totam?
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
