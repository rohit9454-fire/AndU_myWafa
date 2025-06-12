import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import createStyle from './styles';
import {useTranslation} from 'react-i18next';
import LoginInputs from './LoginInputs';

export type LoginTypesProps = {
  forgotPassword?: boolean;
};

const LoginTypeSelection = (props: LoginTypesProps) => {
  const styles = createStyle();
  const {t} = useTranslation();
  const [loginType, setLoginType] = useState<string>('');
  const [placeHolder, setPlaceHolder] = useState<string>('');

  return (
    <View>
      <View style={styles.radioContainer}>
        {[t('common:email'), t('common:email'), t('common:mobile')].map(
          type => (
            <TouchableOpacity
              key={type}
              style={styles.radioOption}
              onPress={() => {
                setLoginType(type);
                setPlaceHolder(type.charAt(0).toUpperCase() + type.slice(1));
              }}>
              <View style={styles.radioCircle}>
                {loginType === type && (
                  <View style={styles.radioCircleSelected} />
                )}
              </View>
              <Text style={styles.radioText}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Text>
            </TouchableOpacity>
          )
        )}
      </View>
      <LoginInputs
        placeHolder={placeHolder}
        forgotPassword={props.forgotPassword ? props.forgotPassword : false}
        loginType={loginType}
      />
    </View>
  );
};

export default LoginTypeSelection;
