import { View, Image, AppState, Platform, NativeModules, BackHandler } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '@navigation/navigationType';
import createStyle from './Styles';
import { Images } from '@assets/icons';
import { getLanguage } from '@services/utils/LocalStore/LanguageStore';
import { getUserData } from '@services/utils/LocalStore/UserDetailsStore';
import ReadRemoteConfig from '@components/organisms/ReadRemoteConfig/ReadRemoteConfig';
import { useEncryptedConfig } from '@services/utils/LocalStore/ConfigeStore';
import { getAPIClient } from '@network/APICall/APIClient';
import { getOTPVerify } from '@services/utils/LocalStore/VerifyOtpStore';
import ConfigFallback from '@assets/configFallback.json'
import Config from 'react-native-config';
import JailMonkey from 'jail-monkey';

const Splash = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const style = createStyle();
  const { setConfigData } = useEncryptedConfig();
  const appState = useRef(AppState.currentState);
  const { JailbreakDetector } = NativeModules;
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const checkAndroidSecurity = async () => {
    const isDebugged = await JailMonkey.isDebuggedMode();
    const isCompromised = JailMonkey.isJailBroken();
    if (isCompromised && !__DEV__) {
      BackHandler.exitApp();
    }
  }

  useEffect(() => {  
    setAppStateVisible(appState.current);
    if (Platform.OS === 'ios' && !__DEV__) {
      JailbreakDetector.standardDeviceCheck();  // Checking IOS Device is JailBreked or Not.
    }
    if (Platform.OS === 'android') {
      getConfigData();                  // calling the config API for Android.
      checkAndroidSecurity();           // Checking Android Device is Rooted or Not
    }
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        getConfigData();                           // calling the config API for both in Active mode.
        checkAndroidSecurity()                     // Checking Android Device is Rooted or Not
        JailbreakDetector.standardDeviceCheck();   // Checking IOS Device is JailBreked or Not.
      }
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, [appStateVisible]);

  const getConfigData = async () => {
    try {
      if (Config.CONFIG_URL) {
        const remoteData = await getAPIClient(Config.CONFIG_URL);
        const mergedData = { ...ConfigFallback, ...remoteData }; // Merging Remote and FallBack Config
        setConfigData(JSON.stringify(mergedData))
      }
    } catch (error) {
      setConfigData(JSON.stringify(ConfigFallback))  // Config API fails then pick Config From Local
      console.error('Error fetching remote JSON:', error);
    }
  }

  const getLangStatus = async () => {
    const langStatus = await getLanguage();
    const otpStatus = await getOTPVerify();
    const userData = await getUserData();
    if (userData && langStatus === 'true' && otpStatus === 'true') {
      if (JSON.parse(userData)?.memberCard) {
        navigation.navigate('Drawer');
      }
    } else if (langStatus === 'true') {
      navigation.navigate('Main');
    } else if (langStatus === 'false' || langStatus === null || langStatus === undefined) {
      navigation.navigate('Language');
    }
  };

  return (
    <View style={style.container}>
      {appStateVisible === 'active' && <ReadRemoteConfig getLangStatus={getLangStatus} />}
      <Image source={Images.appIcon} />
    </View>
  );
};

export default Splash;
