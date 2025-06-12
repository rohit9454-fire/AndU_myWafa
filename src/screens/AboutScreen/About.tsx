import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import createStyle from '@screens/AboutScreen/Styles';
import Config from 'react-native-config';
import { t } from 'i18next';
 
const AboutScreen = () => {
  const [appVersion, setAppVersion] = useState('');
  const [appEnv, setEnv] = useState('');
  const styles = createStyle();
 
  useEffect(() => {
    getAppEnv();
    getAppVersion();
  }, []);
 
  const getAppVersion = async () => {
    const version = await DeviceInfo.getVersion();
    setAppVersion(version);
  };
 
  const getAppEnv = () => {
    const env: string = Config.ENVIRONMENT ? Config.ENVIRONMENT : '';
    setEnv(env);
  };
 
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.text}>
          {t('common:appVersion')} : 
        </Text>
        <Text style={styles.text}>
         {appVersion}
        </Text>
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.text}>
          {t('common:appEnv')} : 
        </Text>
        <Text style={styles.text}>
         {appEnv}
        </Text>
      </View>
    </View>
  );
};
 
export default AboutScreen;