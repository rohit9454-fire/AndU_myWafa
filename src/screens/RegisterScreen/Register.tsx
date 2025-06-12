import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  Keyboard,
  Alert,
  I18nManager,
} from 'react-native';
import { useEffect, useState } from 'react';
import createStyle from './Styles';
import { useTranslation } from 'react-i18next';
import Input from '@components/atoms/TextInput/Input';
import { Button } from '@components/atoms/Button/Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '@navigation/navigationType';
import { Dimensions } from 'react-native';
import {
  Dropdown,
  AndroidDropDown,
} from '@components/atoms/DropDownPicker/Dropdown';
import { getResponseResult } from '@network/soap/SoapService';
import Loader from '@components/molecule/Loader/Loader';
import { getMMCardService } from '@network/soap/SoapMMService';
import NavToolBar from '@components/molecule/NavToolBar/NavToolBar';

const Register = () => {
  const [fName, setFName] = useState<string>('');
  const [lName, setLName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [fNameError, setFNameError] = useState<string>('');
  const [lNameError, setLNameError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');
  const [genderError, setGenderError] = useState<string>('');
  const [isGender, setIsGender] = useState<boolean>(false);
  const [gender, setGender] = useState<string | undefined>('');
  const [keyboardStatus, setKeyboardStatus] = useState<string>('closed');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const { width } = Dimensions.get('window');
  const styles = createStyle();
  const { t } = useTranslation();
  const genderTypeEn = [
    { label: 'Select Gender', value: '' },
    { label: 'Female', value: '2' },
    { label: 'Male', value: '1' },
  ];
  const genderTypeAr = [
    { label: 'حدد الجنس', value: '' },
    { label: 'أنثى', value: '2' },
    { label: 'ذكر', value: '1' },
  ];

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardStatus('open');
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardStatus('closed');
      }
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const validateInputs = () => {
    let isValid = true;

    // Name validation (Only letters, 1-10 characters)
    const nameRegex = /^[a-zA-Z]{1,10}$/;

    if (!fName) {
      setFNameError(t('common:enterFirstName'));
      isValid = false;
    } else if (!nameRegex.test(fName)) {
      setFNameError(t('common:invalidFirstName'));
      isValid = false;
    } else {
      setFNameError('');
    }

    if (!lName) {
      setLNameError(t('common:enterLastName'));
      isValid = false;
    } else if (!nameRegex.test(lName)) {
      setLNameError(t('common:invalidLastName'));
      isValid = false;
    } else {
      setLNameError('');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError(t('common:enterEmail'));
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError(t('common:invalidEmail'));
      isValid = false;
    } else {
      setEmailError('');
    }

    // Phone validation (UAE Format: starts with '5', exactly 9 digits)
    const phoneRegex = /^5\d{8}$/;
    if (!phone) {
      setPhoneError(t('common:enterPhoneNumber'));
      isValid = false;
    } else if (!phoneRegex.test(phone)) {
      setPhoneError(t('common:invalidPhone'));
      isValid = false;
    } else {
      setPhoneError('');
    }

    // Gender validation
    if (!gender) {
      setGenderError(t('common:selectGender'))
      isValid = false;
    } else {
      setGenderError('');
    }

    return isValid;
  };

  const handleNext = async () => {
    if (validateInputs() && gender) {
      const gen = parseInt(gender, 10);
      const userDetails = {
        mobileNo: phone,
        firstName: fName,
        lastName: lName,
        email: email,
        gender: gen,
      };
      const cardDetails = {
        mMCard: phone,
        loyType: 0,
        getBalanceOnlyFlag: false,
        currCode: 'AED',
        countryCode: '971',
        firstName: '',
        lastName: '',
      };
      try {
        setIsLoading(true);
        const res = await getMMCardService(cardDetails);
        const result = await getResponseResult(res);
        if (result && result?.IsSuccess === "true") {
          setIsLoading(false);
          Alert.alert(t('common:andYou'), t('common:userFound'));
        } else if (result?.errorCode === '9012') {
          navigation.navigate('Otp', {
            userDetails,
            cardDetails,
            fromScreen: 'Register',
          });
        }
      } catch (error: any) {
        setIsLoading(false);
      }
    }
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <NavToolBar title={t('common:signUp')}/>
        <Text style={styles.description} numberOfLines={4}>
          {t('common:signUpDescription')}
        </Text>
        <View style={styles.formView}>
          <Text style={styles.register}>{t('common:register')}</Text>
          <Input
            customStyle={styles.input}
            placeHolder={t('common:firstName')}
            val={fName}
            isFull={true}
            inputWidth={width * 0.55}
            setVal={setFName}
          />
          {fNameError && <Text style={styles.errorText}>{fNameError}</Text>}
          <Input
            customStyle={styles.input}
            inputWidth={width * 0.55}
            placeHolder={t('common:lastName')}
            val={lName}
            isFull={false}
            setVal={setLName}
          />
          {lNameError && <Text style={styles.errorText}>{lNameError}</Text>}
          <Input
            customStyle={styles.input}
            inputWidth={width * 0.55}
            placeHolder={t('common:email')}
            val={email}
            isFull={false}
            setVal={setEmail}
          />
          {emailError && <Text style={styles.errorText}>{emailError}</Text>}
          <Input
            customStyle={styles.mobInput}
            inputWidth={width * 0.45}
            placeHolder={t('common:mobileNum')}
            val={phone}
            keyboardType={'number-pad'}
            maxLength={9}
            isFull={false}
            setVal={setPhone}
          />
          {phoneError && <Text style={styles.errorText}>{phoneError}</Text>}
          {Platform.OS === 'ios' ? (
            <Dropdown
              data={I18nManager.isRTL ? genderTypeAr : genderTypeEn}
              customStyle={styles.dropDownWidth}
              isOpen={isGender}
              setVal={setGender}
              val={gender}
              toggleDropdown={() => setIsGender(!isGender)}
            />
          ) : (
            <AndroidDropDown
              data={I18nManager.isRTL ? genderTypeAr : genderTypeEn}
              customStyle={styles.dropDownWidth}
              isOpen={isGender}
              setVal={setGender}
              val={gender}
              toggleDropdown={() => setIsGender(!isGender)}
            />
          )}
          {genderError && <Text style={styles.errorText}>{genderError}</Text>}
          <Button
            title={t('common:next')}
            customStyle={styles.btnNext}
            onPress={handleNext}
          />
          <View style={styles.loginRedirect}>
            <Text style={styles.alreadyText}>{t('common:alreadyLogin')}</Text>
            <TouchableOpacity
              style={styles.loginBtn}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginText}>{t('common:login')}</Text>
            </TouchableOpacity>
          </View>
        </View>
        {isLoading && <Loader />}
      </View>
      {keyboardStatus === 'open' && <View style={styles.iosView} />}
    </ScrollView>
  );
};

export default Register;
