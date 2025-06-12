import {
  View,
  Text,
  SafeAreaView,
  Image,
  Platform,
  ScrollView,
  Dimensions,
  Alert,
  I18nManager,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import createStyle from '@screens/ProfileUpdate/Styles';
import {useTranslation} from 'react-i18next';
import {Images} from '@assets/icons';
import {
  Dropdown,
  AndroidDropDown,
} from '@components/atoms/DropDownPicker/Dropdown';
import {Button} from '@components/atoms/Button/Button';
import {getUserData, setUserData} from '@services/utils/LocalStore/UserDetailsStore';
import Input from '@components/atoms/TextInput/Input';
import {
  createCustomerMMService,
  getMMCardService,
} from '@network/soap/SoapMMService';
import {getResponseResult} from '@network/soap/SoapService';
import Loader from '@components/molecule/Loader/Loader';
import NavToolBar from '@components/molecule/NavToolBar/NavToolBar';

const ProfileUpdate = () => {
  const styles = createStyle();
  const {t} = useTranslation();
  const {width} = Dimensions.get('window');
  const [fName, setFName] = useState<string>('');
  const [lName, setLName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [isGender, setIsGender] = useState<boolean>(false);
  const [gender, setGender] = useState<string | undefined>('0');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fNameError, setFNameError] = useState<string>('');
  const [lNameError, setLNameError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');
  const [genderError, setGenderError] = useState<string>('');
  
  const genderTypeEn = [
    {label: 'Select Gender', value: ''},
    {label: 'Female', value: '2'},
    {label: 'Male', value: '1'},
  ];
  const genderTypeAr = [
    {label: 'حدد الجنس', value: ''},
    {label: 'أنثى', value: '2'},
    {label: 'ذكر', value: '1'},
  ];

  useEffect(() => {
    getUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserDetails = async () => {
    const data = await getUserData();
    if (data) {
      const {memberName, memberEmail, memberphone, membergender} =
        JSON.parse(data);
      const fN = memberName.split(' ');
      setFName(fN[0]);
      setLName(fN[1]);
      setEmail(memberEmail);
      setPhone(memberphone);
      const genderData = genderTypeEn.find(
        item => item.label.toUpperCase() === membergender.toUpperCase()
      );
      if (genderData?.value) {
        setGender(genderData?.value);
      }
    }
  };

  // const validateInputs = () => {
  //   if (!fName) {
  //     Alert.alert(t('common:mywafa'), t('common:invalidFirstName'));
  //     return false;
  //   }
  //   if (!lName) {
  //     Alert.alert(t('common:mywafa'), t('common:invalidLastName'));
  //     return false;
  //   }
  //   if (!email) {
  //     Alert.alert(t('common:mywafa'), t('common:invalidEmail'));
  //     return false;
  //   }
  //   if (!gender) {
  //     Alert.alert(t('common:mywafa'), t('common:selectGender'));
  //     return false;
  //   }
  //   const nameRegex = /^[a-zA-Z]{1,10}$/; // Only letters and spaces, 2-30 characters
  //   if (!nameRegex.test(fName)) {
  //     Alert.alert(t('common:mywafa'), t('common:regex_Name'));
  //     return false;
  //   }
  //   if (!nameRegex.test(lName)) {
  //     Alert.alert(t('common:mywafa'), t('common:regex_Name'));
  //     return false;
  //   }
  //   // Validate email format
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (!emailRegex.test(email)) {
  //     Alert.alert(t('common:mywafa'), t('common:invalidEmail'));
  //     return false;
  //   }
  //   if (gender === undefined && gender === null) {
  //     Alert.alert(t('common:mywafa'), t('common:Please Select Gender'));
  //     return false;
  //   }
  //   return true;
  // };



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

  const handleUpdate = async () => {
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
      setIsLoading(true);
      try {
        await createCustomerMMService(userDetails);
        const data = await getMMCardService(cardDetails);
        const userData = await getResponseResult(data);
        const {memberName, memberEmail} = userData;
        const resName = memberName.split(' ');
        if (
          fName === resName[0] &&
          lName === resName[1] &&
          memberEmail === email
        ) {
          setUserData(JSON.stringify(userData));
          setIsLoading(false);
          Alert.alert(t('common:andYou'), t('common:userUpdated'));
        } else if (
          fName !== resName[0] ||
          lName !== resName[1] ||
          memberEmail !== email
        ) {
          setIsLoading(false);
          Alert.alert(t('common:andYou'), t('common:somethingWentWrong'));
        }
      } catch (error: any) {
        setIsLoading(false);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.subContainer}>
          <NavToolBar title={t('common:updateText')}/>
          <Image source={Images.wafaLogo} style={styles.logo} resizeMode={'contain'}/>
          <View style={styles.formView}>
            <Input
              customStyle={styles.dobStyle}
              placeHolder={t('common:firstName')}
              val={fName}
              isFull={true}
              inputWidth={width * 0.7}
              setVal={setFName}
            />
            {fNameError && <Text style={styles.errorText}>{fNameError}</Text>} 
            <Input
              customStyle={styles.dobStyle}
              inputWidth={width * 0.7}
              placeHolder={t('common:lastName')}
              val={lName}
              isFull={false}
              setVal={setLName}
            />
            {lNameError && <Text style={styles.errorText}>{lNameError}</Text>} 
            <Input
              customStyle={styles.dobStyle}
              inputWidth={width * 0.7}
              placeHolder={t('common:email')}
              val={email}
              isFull={false}
              setVal={setEmail}
            />
            {emailError && <Text style={styles.errorText}>{emailError}</Text>} 
            <Input
              customStyle={styles.mobInput}
              inputWidth={width * 0.645}
              editable={false}
              placeHolder={t('common:mobileNum')}
              val={phone}
              maxLength={9}
              isFull={false}
              setVal={setPhone}
            />
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
              title={t('common:save')}
              onPress={handleUpdate}
              customStyle={styles.saveBtn}
            />
          </View>
        </View>
        {isLoading && <Loader />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileUpdate;
