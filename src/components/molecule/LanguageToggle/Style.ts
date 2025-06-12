import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../../assets/colors';
import { fonts } from '@assets/fonts';
const {width}=Dimensions.get('window');
const createStyle = () =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      width: width * 0.6,
      borderRadius:8,
      alignSelf:'center',
      backgroundColor: colors.grey,
      justifyContent: 'space-between',
    },
    selectedButton: {
      backgroundColor: colors.primaryDark,
      borderRadius: 8,
      width: width* 0.3,
      alignItems:'center',
      justifyContent:'center',
    },
    gradedButton: {
      alignItems:'center',
      justifyContent:'center',
      backgroundColor: colors.grey,
      borderRadius: 8,
      width: width* 0.3
    },
    selectedText: {
      alignSelf: 'center',
      color: colors.white,
      paddingVertical:8,
      fontFamily: fonts.regular
    },
    gradedText: {
      alignSelf: 'center',
      paddingVertical:8,
      color: colors.primaryDark,
      fontFamily: fonts.regular
    },
  });

export default createStyle;
