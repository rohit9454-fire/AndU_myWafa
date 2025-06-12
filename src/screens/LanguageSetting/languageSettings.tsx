import {Image, Text, View} from 'react-native';
import React from 'react';
import createStyle from '@screens/LanguageSetting/Styles';
import {useTranslation} from 'react-i18next';
import {LanguageToggleButton} from '@components/molecule/LanguageToggle/LanguageToggle';
import {Images} from '@assets/icons';

const LanguageSettings = () => {
  const style = createStyle();
  const {t} = useTranslation();
  return (
    <View style={style.headContainer}>
      <Image source={Images.wafaLogo} style={style.logo} resizeMode={'contain'}/>
      <View style={style.container}>
        <Text style={style.headingEng}>{t('common:pleaseSelectAr')}</Text>
        <Text style={style.headingEng}>{t('common:pleaseSelect_lang')}</Text>
      </View>
      <LanguageToggleButton />
    </View>
  );
};

export default LanguageSettings;
