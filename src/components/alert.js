import {Alert} from 'react-native';

const AlertOnly = Content => {
  Alert.alert(
    'Thông báo',
    Content,
    [
      {
        text: 'OK',
        onPress: () => {
          // navigate('AuthStackScreen');
        },
        style: 'cancel',
      },
    ],
    {cancelable: false},
  );
};
export {AlertOnly};
