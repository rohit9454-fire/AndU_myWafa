import React, { FC, useEffect, useState } from 'react';
import { Platform, View, Linking } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import VersionCheck from 'react-native-version-check';
import AlertView from '@components/atoms/CustomAlert/AlertView';
import { t } from 'i18next';
import Loader from '@components/molecule/Loader/Loader';
import { ConfigData, useEncryptedConfig } from '@services/utils/LocalStore/ConfigeStore';
import { IOS_APP_STORE_URL } from '@constants/Contants';
import { getAPIClient } from '@network/APICall/APIClient';
type UpdateStatus = 'normalUpgrade' | 'forceUpgrade' | 'appIsUpToDate';

interface ReadRemoteProps {
  getLangStatus: () => void;
}

const ReadRemoteConfig: FC<ReadRemoteProps> = ({ getLangStatus }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentAndroidVersion, setCurrentAndroidVersion] = useState<string>('1.0');
  const [currentIOSVersion, setCurrentIOSVersion] = useState<string>('0.0.1');
  const [installedIOSAppVersion,setInstalledIOSAppVersion] = useState<string>('0.0.1');
  const [installedAndroidAppVersion,setInstalledAndroidAppVersion] = useState<string>('1.0');
  const { configData } = useEncryptedConfig();
  
  useEffect(() => {
    CheckAppVersion();
    getAppVersion();
    if(configData){
      // setCurrentAndroidVersion(configData?.currentAndroidVersion);
      // setCurrentIOSVersion(configData?.currentiOSVersion);
      setIsLoading(false);
    }
  }, []);

  const getAppVersion = () => {
    const version = DeviceInfo.getVersion();
    if(Platform.OS === 'ios'){
      // setInstalledIOSAppVersion(version);
    }
    if(Platform.OS === 'android'){
      // setInstalledAndroidAppVersion(version);
    }
  };

  const checkVersion = (data?: ConfigData): UpdateStatus => {
    /*
      Update App Main Check If (CurrentVersion > InstalledVersion )
      Minversion > InstalledVersion => ForceUpdate.
      InstalledVersion >= MinVersion => NormalUpdate.
      CurrentVersion === InstalledVersion => Normal App Flow.
    */

    if (Platform.OS === 'ios') {
      if (currentIOSVersion > installedIOSAppVersion) {
        return installedIOSAppVersion >= configData?.miniOSVersion ? 'normalUpgrade' : 'forceUpgrade';
      }
      if (currentIOSVersion === installedIOSAppVersion) {
        getLangStatus();
      }
    }

    if (Platform.OS === 'android') {
      if (currentAndroidVersion > installedAndroidAppVersion) {
        return installedAndroidAppVersion >= configData?.minAndroidVersion ? 'normalUpgrade' : 'forceUpgrade';
      }
      if (currentAndroidVersion === installedAndroidAppVersion) {
        getLangStatus();
      }
    }
    return 'appIsUpToDate';
  };

  const onOK = async () => {
    // TODO: Need the iOS AppID so this Linking URL 
    Linking.openURL(await (Platform.OS === 'ios' ?
      VersionCheck.getAppStoreUrl({ appID: 'com.ssports.ios' })
      : VersionCheck.getPlayStoreUrl({ packageName: 'com.nikeme.android' })));
  }

  const onCancel = async () => {
    getLangStatus();
  }

  const CheckAppVersion = async () => {
    try {
      if (Platform.OS === 'ios') {
        const currentAppStoreVersion = await getAPIClient(IOS_APP_STORE_URL)
        // setCurrentIOSVersion(currentAppStoreVersion?.results[0]?.version);
      }
      if (Platform.OS === 'android') {
        const currentPlayStoreVersion = await VersionCheck.getLatestVersion({
          provider: 'playStore',
          packageName: 'com.nikeme.android',
          ignoreErrors: true,
        });
        // setCurrentAndroidVersion(currentPlayStoreVersion);
      }
    } catch (error) {
      console.log('Error Checking App version ', error);
    }
  }

  return (
    <View>
      {(isLoading) ? (
        <Loader />
      ) : (<>
        {configData && checkVersion(configData) === 'normalUpgrade' &&
          <AlertView
            title={t('common:andYou')}
            message={t('common:appUpdateText')}
            ok={t('common:update')}
            onOK={onOK}
            onCancel={onCancel}
            cancel={t('common:skip')} />}
        {configData && checkVersion(configData) === 'forceUpgrade' &&
          <AlertView title={t('common:andYou')}
            message={t('common:appUpdateText')}
            ok={t('common:update')}
            onOK={onOK} />}
      </>
      )}
    </View>
  );
};

export default ReadRemoteConfig;
