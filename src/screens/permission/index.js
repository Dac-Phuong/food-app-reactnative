import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {Platform} from 'react-native';

const PLATFORM_READ_EXTERNAL_STORAGE = {
  ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
  android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
};

const PLATFORM_WRITE_EXTERNAL_STORAGE = {
  ios: PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
  android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
};

const PLATFORM_CAMERA = {
  ios: PERMISSIONS.IOS.CAMERA,
  android: PERMISSIONS.ANDROID.CAMERA,
};

const PLATFORM_LOCATION = {
  ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
};

const PLATFORM_CONTACTS = {
  ios: PERMISSIONS.IOS.CONTACTS,
  android: PERMISSIONS.ANDROID.READ_CONTACTS,
};

const REQUEST_PERMISSIONS_TYPE = {
  PhotoLibrary: PLATFORM_READ_EXTERNAL_STORAGE,
  Camera: PLATFORM_CAMERA,
  Location: PLATFORM_LOCATION,
  Contacts: PLATFORM_CONTACTS,
  SavePhotoLibrary: PLATFORM_WRITE_EXTERNAL_STORAGE,
};

const PERMISSIONS_TYPE = {
  PhotoLibrary: 'PhotoLibrary',
  Camera: 'Camera',
  Location: 'Location',
  Contacts: 'Contacts',
  SavePhotoLibrary: 'SavePhotoLibrary',
};

const checkPermission = async type => {
  const Permissions = REQUEST_PERMISSIONS_TYPE[type][Platform.OS];
  if (!Permissions) {
    return true;
  }
  try {
    const result = await check(Permissions);
    if (result === RESULTS.GRANTED) {
      return true;
    }
    return requestPermissions(Permissions);
  } catch (error) {
    return false;
  }
};

const requestPermissions = async Permissions => {
  try {
    const result = await request(Permissions);
    return result === RESULTS.GRANTED;
  } catch (error) {
    return false;
  }
};

export {checkPermission, PERMISSIONS_TYPE};
