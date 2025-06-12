import React, { FC, useEffect, useState } from 'react';
import { Image, Text, TextInput, View, ScrollView, Alert } from 'react-native';
import createStyle from './styles';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '@navigation/navigationType';
import { useTranslation } from 'react-i18next';
import { Button } from '@components/atoms/Button/Button';
import { getUserData, setUserData } from '@services/utils/LocalStore/UserDetailsStore';
import { getResponseResult } from '@network/soap/SoapService';
import {
  createCustomerMMService,
  getMMCardService,
} from '@network/soap/SoapMMService';
import Loader from '@components/molecule/Loader/Loader';
import { Images } from '@assets/icons';
import { encryptAES, hashSHA256WithSalt } from '@services/utils/AES/Encryption';
import { APP_CONSTANTS, ECOMM_BASE_URL } from '@constants/Contants';
import { postAPIClient } from '@network/APICall/APIClient';
import { setOTPVerify } from '@services/utils/LocalStore/VerifyOtpStore';
import Timer from '@components/molecule/Timer/Timer';
import OtpComponent from '@components/molecule/OtpComponent/OtpComponent';
import NavToolBar from '@components/molecule/NavToolBar/NavToolBar';
import { useFetchPrefComm } from '@network/APICall/PrefCommHook';

type OtpScreenRouteProp = RouteProp<StackParamList, 'Otp'>;
type OtpScreenProps = {
  route: OtpScreenRouteProp;
};

const OtpScreen: FC<OtpScreenProps> = ({ route }) => {
  const style = createStyle();
  const { t } = useTranslation();
  const params = route.params || {}; // Ensure params is not undefined
  const { userDetails, cardDetails, fromScreen } = params;
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const [otp, setOtp] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>('');
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [time, setTime] = useState<number>(APP_CONSTANTS.OTP_TIMER);

  const { data, apiError } = useFetchPrefComm();  // Preference Communication Hook with Two Apis Calls

  const handleInputChange = (text: string) => {
    setOtp(text);
  };

  const inputRefs: Array<TextInput | null> = [];

  const handleOtp = async () => {
    setIsLoading(true);
    if (otp.length === 0) {
      setIsLoading(false);
      Alert.alert(t('common:mywafa'), t('common:emptyOtp'));
    }
    if (otp.length > 0 && otp.length < 4) {
      setIsLoading(false);
      Alert.alert(t('common:mywafa'), t('common:emptyOtp'));
    }
    if (otp.length === 4) {
      verifyOTP();
    }
  };

  const handleCommunicationPreference = () => {
    if (data) {
      navigation.navigate('Drawer');
    } else if (apiError) {
      if (apiError?.status === 401) {
        navigation.navigate('CommunicationPreference');
      }
    }
  }

  useEffect(() => {
    getUserDetails();
    if (inputRefs[0]) {
      inputRefs[0].focus(); // Auto-focus the first input field
    }
  }, []);

  useEffect(() => {
    const unsbscribe = navigation.addListener('beforeRemove', e => {
      return true;
    })
    return unsbscribe;
  }, [navigation])

  const userVerified = async () => {
    if (fromScreen === 'Register') {
      if (userDetails && cardDetails) {
        await createCustomerMMService(userDetails);
        const data = await getMMCardService(cardDetails);
        const userData = await getResponseResult(data);
        setUserData(JSON.stringify(userData));
        setIsLoading(false);
        handleCommunicationPreference();
      }
    }
    else if (fromScreen === 'Login') {
      setIsLoading(false);
      navigation.navigate('Drawer');
    }
  }

  const getOTP = async (userPhone: string) => {
    setIsRunning(true)
    setTime(APP_CONSTANTS.OTP_TIMER);
    const encryptedNumber = encryptAES(APP_CONSTANTS.UAE_COUNTRY_CODE + `${userPhone}`);
    const hashedData = hashSHA256WithSalt(APP_CONSTANTS.UAE_COUNTRY_CODE + `${userPhone}`);
    const requestData = {
      number: encryptedNumber,
      hash: hashedData
    }

    const response = await postAPIClient(ECOMM_BASE_URL + APP_CONSTANTS.SEND_OTP, requestData);
    console.log('res of getOTP ', response);
  }

  const verifyOTP = async () => {
    // const phone = '8172914148';
    const encryptedNumber = encryptAES(APP_CONSTANTS.UAE_COUNTRY_CODE + `${phone}`);
    const encryptedOTP = encryptAES(otp);
    const hashedData = hashSHA256WithSalt(APP_CONSTANTS.UAE_COUNTRY_CODE + `${phone}:${otp}`);
    const requestData = {
      number: encryptedNumber,
      otp: encryptedOTP,
      hash: hashedData
    }
    try {
      const response: any = await postAPIClient(ECOMM_BASE_URL + APP_CONSTANTS.VALIDATE_OTP, requestData);
      if (response?.success === true) {
        setOTPVerify(true) // set the flag to handle the navigation on Splash during to Launch or Re-Launch the Application.
        userVerified()
      }
    } catch (error: any) {
      setIsLoading(false);
      Alert.alert(t('common:andYou'), t('common:pleaseEnterCorrectOTP'));
    }
  }

  const getUserDetails = async () => {

    let userPhone: string | undefined;
    const data = await getUserData();

    if (data) {
      const parsedData = JSON.parse(data);
      userPhone = parsedData?.memberphone;
    } else if (userDetails) {
      userPhone = userDetails.mobileNo;
    }

    if (userPhone) {
      setPhone(userPhone);
      // getOTP('8172914148')
      getOTP(userPhone);
    }
  };

  return (
    <ScrollView contentContainerStyle={style.scrollContainer}>
      <NavToolBar title={t('common:otp')} />
      <View style={style.container}>
        <Image
          style={style.logoStyle}
          source={Images.wafaLogo}
        />
        <Text style={style.otpText}>{t('common:otpText')}</Text>
        <View style={style.otpContainer}>
          <OtpComponent
            handleInputChange={text => handleInputChange(text)}
          />
        </View>
        <View style={style.textBlock}>
          {[
            phone && {
              label: t('common:phone'),
              value: phone,
              style: style.phoneText,
            },
          ].map((item: any, index) => (
            <View key={index} style={style.textContainer}>
              <Text style={item.style}>{item.label}</Text>
              <Text style={item.style}>{item.value}</Text>
            </View>
          ))}
        </View>
        <View style={style.timerBlock}>
          <Timer setIsRunning={setIsRunning} isRunning={isRunning} setTime={setTime} time={time} />
          <Button
            onPress={() => getOTP(phone)}
            // onPress={() => getOTP('8172914148')}
            disabled={isRunning}
            title={t('common:resendOtp').toLocaleUpperCase()}
            titleStyle={isRunning ? style.resendOtpTitleDisable : style.resendOtpTitle}
            customStyle={isRunning ? style.resendOtpDisable : style.resendOtp}
          />
        </View>
      </View>
      <Button
        onPress={handleOtp}
        title={t('common:submit').toLocaleUpperCase()}
        customStyle={style.buttonStyle}
      />
      {isLoading && <Loader />}
    </ScrollView>
  );
};

export default OtpScreen;
