import { LOCAL_STORAGE_KEY } from '@constants/Contants';
import EncryptedStorage from 'react-native-encrypted-storage';

export const setTransactionDetails = async (details: string) => {
  try {
    await EncryptedStorage.setItem(LOCAL_STORAGE_KEY.TRANSACTION_DATA, details);
  } catch (error) {
    console.error('Error set transaction details :', error);
  }
};

export const getTransactionDetails = async () => {
  try {
    const transactionDetails = await EncryptedStorage.getItem(LOCAL_STORAGE_KEY.TRANSACTION_DATA);
    return transactionDetails;
  } catch (error) {
    console.error('Error in get transaction details :', error);
    return 'false';
  }
};


export const clearTransactionDetails  = async () => {
  try {
    await EncryptedStorage.removeItem(LOCAL_STORAGE_KEY.TRANSACTION_DATA);
  } catch (error) {
    console.error('Error in clear transaction details :', error);
    return 'false';
  }
};
