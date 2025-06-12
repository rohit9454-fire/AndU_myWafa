import { LOCAL_STORAGE_KEY } from '@constants/Contants';
import EncryptedStorage from 'react-native-encrypted-storage';

export const setPCAuthToken = async (value: string) => {
  try {
    await EncryptedStorage.setItem(LOCAL_STORAGE_KEY.PC_AUTH_TOKEN, value);
  } catch (error) {
    console.error('Error setting pcAuthToken:', error);
  }
};

export const getPCAuthToken = async (): Promise<string> => {
  try {
    const pcAuthToken: string | null = await EncryptedStorage.getItem(LOCAL_STORAGE_KEY.PC_AUTH_TOKEN);
    return pcAuthToken ?? '' ;
  } catch (error) {
    console.error('Error getting pcAuthToken:', error);
    return 'false';
  }
};


export const setPCConsentResponse = async (value: string) => {
    try {
      await EncryptedStorage.setItem(LOCAL_STORAGE_KEY.PC_CONSENT_RESPONSE, value);
    } catch (error) {
      console.error('Error setting pcAuthToken:', error);
    }
  };


export const getPCConsentResponse = async (): Promise<string> => {
    try {
      const pcConsentResponse: string | null = await EncryptedStorage.getItem(LOCAL_STORAGE_KEY.PC_CONSENT_RESPONSE);
      return pcConsentResponse ?? '' ;
    } catch (error) {
      console.error('Error getting pcConsentResponse:', error);
      return 'false';
    }
  };  
  
