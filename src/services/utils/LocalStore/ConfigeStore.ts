import { useCallback, useState, useEffect } from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import ConfigFallback from '@assets/configFallback.json'
import { LOCAL_STORAGE_KEY } from '@constants/Contants';
import { OneTrustConsentInfo } from '@network/soap/Interface';
export interface ConfigData {
  _id: string;
  miniOSVersion: string;
  currentiOSVersion: string;
  minAndroidVersion: string;
  currentAndroidVersion: string;
  about: string;
  storelocator: string;
  tnc: string;
  faq: string;
  facebook: string;
  instagram: string;
  x: string;
  onetrust_consent_info: OneTrustConsentInfo
}


export const useEncryptedConfig = () => {
  const [configData, setConfigDataState] = useState<ConfigData>(ConfigFallback);
  const [loading, setLoading] = useState<boolean>(true);

  // Function to save config data
  const setConfigData = useCallback(async (ConfigData: string) => {
    try {
      await EncryptedStorage.setItem(LOCAL_STORAGE_KEY.CONFIG_KEY, ConfigData);
      setConfigDataState(JSON.parse(ConfigData)); // Update state
    } catch (error) {
      console.error('Error setting ConfigData:', error);
    }
  }, []);

  // Function to retrieve config data
  const getConfigData = useCallback(async () => {
    try {
      const storedData = await EncryptedStorage.getItem(LOCAL_STORAGE_KEY.CONFIG_KEY);
      if (storedData) {
        setConfigDataState(JSON.parse(storedData));
        return JSON.parse(storedData);
      }
      return null;
    } catch (error) {
      console.error('Error getting ConfigData:', error);
      return null;
    }
  }, []);

  // Automatically fetch config data on mount
  useEffect(() => {
    (async () => {
      await getConfigData();
      setLoading(false);
    })();
  }, [getConfigData]);

  return { configData, setConfigData, getConfigData, loading };
};
