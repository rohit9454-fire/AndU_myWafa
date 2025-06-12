import React from 'react';
import {Text, TouchableOpacity, View, I18nManager} from 'react-native';
// import { setStoreLanguage } from '@utils/languageStorage';

import {useTranslation} from 'react-i18next';
import RNRestart from 'react-native-restart';
import createStyle from './Style';
import {setLanguage} from '@services/utils/LocalStore/LanguageStore';

export const LanguageToggleButton = () => {
  const {i18n, t} = useTranslation();
  const style = createStyle();
  const handleLanguageChange = async () => {
    const isArabic = i18n.language === 'ar';
    await I18nManager.allowRTL(!isArabic);
    await I18nManager.forceRTL(!I18nManager.isRTL);
    i18n.changeLanguage(!isArabic ? 'ar' : 'en').then(() => {
      setTimeout(() => {
        setLanguage(true);
        RNRestart.restart();
      }, 1000);
    });
  };

  return (
    <View style={style.container}>
      <TouchableOpacity
        style={
          i18n.language !== 'ar' ? style.selectedButton : style.gradedButton
        }
        onPress={() => handleLanguageChange()}>
        <Text
          style={
            i18n.language !== 'ar' ? style.selectedText : style.gradedText
          }>
          {t('common:english')}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={
          i18n.language === 'ar' ? style.selectedButton : style.gradedButton
        }
        onPress={() => handleLanguageChange()}>
        <Text
          style={
            i18n.language === 'ar' ? style.selectedText : style.gradedText
          }>
          {t('common:arabic')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
