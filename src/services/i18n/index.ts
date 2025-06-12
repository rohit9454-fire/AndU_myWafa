import {initReactI18next} from 'react-i18next';
import {I18nManager} from 'react-native';
import i18n from 'i18next';
const resources = {
  en: require('@assets/lang/en.json'),
  ar: require('@assets/lang/ar.json'),
};

i18n.use(initReactI18next).init({
  resources,
  lng: I18nManager.isRTL ? 'ar' : 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
