import { LOCAL_STORAGE_KEY } from '@constants/Contants';
import EncryptedStorage from 'react-native-encrypted-storage';

export const setUserData = async (UserData: string) => {
  try {
    await EncryptedStorage.setItem(LOCAL_STORAGE_KEY.USER_DATA, UserData);
  } catch (error) {
    console.error('Error setting language:', error);
  }
};

export const getUserData = async () => {
  try {
    const userData = await EncryptedStorage.getItem(LOCAL_STORAGE_KEY.USER_DATA);
    return userData;
  } catch (error) {
    console.error('Error getting language:', error);
    return 'false';
  }
};

export const clearUserData = async () => {
  try {
    await EncryptedStorage.removeItem(LOCAL_STORAGE_KEY.USER_DATA);
  } catch (error) {
    console.error('Error getting language:', error);
    return 'false';
  }
};
