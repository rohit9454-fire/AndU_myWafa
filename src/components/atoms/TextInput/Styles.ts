import {colors} from '@assets/colors';
import {fonts} from '@assets/fonts';
import {Dimensions, I18nManager, Platform, StyleSheet} from 'react-native';
const {width} = Dimensions.get('screen');
const createStyle = () =>
  StyleSheet.create({
    inputView: {
      writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
      width: width * 0.48,
      height: Platform.OS === 'ios' ? 18 : 34,
      alignSelf: 'center',
      fontSize: 12,
      lineHeight: 14,
      fontFamily: fonts.regular,
      color: colors.black,
    },
    phoneText:{
      fontFamily: fonts.regular,
      color: colors.black,
      fontSize: 12,
      lineHeight: 14,
    }
  });

export default createStyle;
