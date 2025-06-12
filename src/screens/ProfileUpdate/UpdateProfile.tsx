import {
  View,
  Text,
  SafeAreaView,
  Image,
  Platform,
  ScrollView,
  Dimensions,
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
import {getUserData} from '@services/utils/LocalStore/UserDetailsStore';
import Input from '@components/atoms/TextInput/Input';

const ProfileUpdate = () => {
  const styles = createStyle();
  const {t} = useTranslation();
  const {width} = Dimensions.get('window');
  const [fName, setFName] = useState<string>('');
  const [lName, setLName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [isGender, setIsGender] = useState<boolean>(false);
  const [gender, setGender] = useState<string | undefined>('');
  const genderType = [
    {label: 'Select Gender', value: ''},
    {label: 'Female', value: '0'},
    {label: 'Male', value: '1'},
  ];
  
  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    await getUserData();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.subContainer}>
          <Image source={Images.logo} style={styles.logo} />
          <View style={styles.borderView} />
          <Text style={styles.updateText}>{t('common:updateText')}</Text>
          <View style={styles.formView}>
            <Text style={styles.askQuestionText}>
              {t('common:askQuestion')}
            </Text>
            <Input
              customStyle={styles.dobStyle}
              placeHolder={t('common:firstName')}
              val={fName}
              isFull={true}
              inputWidth={width * 0.7}
              setVal={setFName}
            />
            <Input
              customStyle={styles.dobStyle}
              inputWidth={width * 0.7}
              placeHolder={t('common:lastName')}
              val={lName}
              isFull={false}
              setVal={setLName}
            />
            <Input
              customStyle={styles.dobStyle}
              inputWidth={width * 0.7}
              placeHolder={t('common:email')}
              val={email}
              isFull={false}
              setVal={setEmail}
            />
            <Input
              customStyle={styles.dobStyle}
              inputWidth={width * 0.7}
              placeHolder={t('common:mobileNum')}
              val={phone}
              maxLength={9}
              isFull={false}
              setVal={setPhone}
            />
            {Platform.OS === 'ios' ? (
              <Dropdown
                data={genderType}
                customStyle={styles.dropDownWidth}
                isOpen={isGender}
                setVal={setGender}
                val={gender}
                toggleDropdown={() => setIsGender(!isGender)}
              />
            ) : (
              <AndroidDropDown
                data={genderType}
                customStyle={styles.dropDownWidth}
                isOpen={isGender}
                setVal={setGender}
                val={gender}
                toggleDropdown={() => setIsGender(!isGender)}
              />
            )}
            <Button
              title={t('common:save')}
              onPress={() => console.log('Save Called')}
              customStyle={styles.saveBtn}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileUpdate;
