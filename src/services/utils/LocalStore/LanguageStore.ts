import { LOCAL_STORAGE_KEY } from '@constants/Contants';
import EncryptedStorage from 'react-native-encrypted-storage';

export const setLanguage = async (flag: boolean) => {
  try {
    await EncryptedStorage.setItem(LOCAL_STORAGE_KEY.LANG_BOOLEAN_KEY, flag.toString());
  } catch (error) {
    console.error('Error setting language:', error);
  }
};

export const getLanguage = async () => {
  try {
    const isLangSelect = await EncryptedStorage.getItem(LOCAL_STORAGE_KEY.LANG_BOOLEAN_KEY);
    return isLangSelect;
  } catch (error) {
    console.error('Error getting language:', error);
    return 'false';
  }
};
