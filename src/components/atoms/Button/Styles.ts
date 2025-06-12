import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '@assets/colors';
import { fonts } from '@assets/fonts';
const {width} = Dimensions.get("window");
const createStyle = () =>
  StyleSheet.create({
    container: {
      marginVertical:10,
      backgroundColor: colors.primaryDark,
      width: width * 0.65,
      alignSelf:'center',
      borderRadius: 4,
    },
    title: {
      alignSelf: 'center',
      color: colors.white,
      fontFamily: fonts.regular,
      paddingVertical: 10
    },
  });

export default createStyle;
