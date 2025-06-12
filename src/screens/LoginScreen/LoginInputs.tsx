import {Dimensions, Text, View} from 'react-native';
import React, {FC, useState} from 'react';
import createStyle from './styles';
import {useTranslation} from 'react-i18next';
import Input from '@components/atoms/TextInput/Input';
import {colors} from '@assets/colors';

export type LoginInputProps = {
  placeHolder: string;
  forgotPassword?: boolean;
  loginType: string;
};

const LoginInputs: FC<LoginInputProps> = ({
  placeHolder,
  forgotPassword,
  loginType,
}) => {
  const styles = createStyle();
  const {t} = useTranslation();
  const {width} = Dimensions.get('window');

  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const validateInput = (value: string) => {
    let error = '';

    if (loginType === t('common:mobile')) {
      const mobileRegex = /^[0-9]{10,15}$/; // Adjust length as needed
      if (!mobileRegex.test(value)) {
        error = t('common:invalidPhone');
      }
    } else if (loginType === t('common:email')) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Standard email format
      if (!emailRegex.test(value)) {
        error = t('common:invalidEmail');
      }
    }  else if (loginType === t('common:name')) {
      const nameRegex = /^[a-zA-Z\s]{2,30}$/; // Only letters and spaces, 2-30 characters
      if (!nameRegex.test(value)) {
        error = t('common:invalid_name');
      }
    }

    setErrorMessage(error);
    return !error; // Returns true if no error
  };

  const handleInputChange = (value: string) => {
    setUserId(value);
    validateInput(value);
  };

  return (
    <View>
      {/* Input Field */}
      <Input
        customStyle={styles.input}
        placeHolder={placeHolder}
        setVal={handleInputChange}
        val={userId}
        inputWidth={width * 0.78}
        iconName={'person-circle-outline'}
      />

      {/* Password Input */}
      {!forgotPassword ? (
        <Input
          customStyle={styles.input}
          placeHolder={t('common:mobile')}
          setVal={setPassword}
          secureTextEntry={true}
          inputWidth={width * 0.78}
          val={password}
          iconName={'key-outline'}
        />
      ) : (
        <>
          <Input
            customStyle={styles.input}
            placeHolder={t('common:enterNewPass')}
            setVal={setPassword}
            secureTextEntry={true}
            inputWidth={width * 0.78}
            val={password}
            iconName={'eye'}
            isPassword={true}
            iconColor={colors.darkGrey}
          />
          <Input
            customStyle={styles.input}
            placeHolder={t('common:confirmNewPass')}
            setVal={setConfirmPassword}
            secureTextEntry={true}
            inputWidth={width * 0.78}
            val={confirmPassword}
            iconName={'eye'}
            isPassword={true}
            iconColor={colors.darkGrey}
          />
        </>
      )}

      {/* Error Message */}
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

export default LoginInputs;
