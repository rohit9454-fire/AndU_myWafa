import { LOCAL_STORAGE_KEY } from '@constants/Contants';
import EncryptedStorage from 'react-native-encrypted-storage';

export const setOTPVerify = async (flag: boolean) => {
try {
    await EncryptedStorage.setItem(LOCAL_STORAGE_KEY.OTP_VERIFY_KEY, flag.toString());
  } catch (error) {
    console.error('Error setting OTP:', error);
  }
}

export const getOTPVerify = async () => {
  try {
    const isOtpVerify = await EncryptedStorage.getItem(LOCAL_STORAGE_KEY.OTP_VERIFY_KEY);
    return isOtpVerify;
  } catch (error) {
    console.error('Error getting OTP:', error);
    return 'false';
  }
};

export const clearOtpFlag = async () => {
    try {
      await EncryptedStorage.removeItem(LOCAL_STORAGE_KEY.OTP_VERIFY_KEY);
    } catch (error) {
      console.error('Error Clearing OTP Flag:', error);
      return 'false';
    }
  };