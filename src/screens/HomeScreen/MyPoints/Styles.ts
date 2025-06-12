import {colors} from '@assets/colors';
import {fonts} from '@assets/fonts';
import {Dimensions, StyleSheet} from 'react-native';
const {width} = Dimensions.get('screen');
const createStyle = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.grey,
    },
    renderContainer: {
      flex: 1,
      width: width * 0.95,
      alignItems: 'center',
      alignSelf: 'center',
    },
    textStyle: {
      backgroundColor: colors.white,
      flexDirection: 'row',
      width: width * 0.9,
      paddingHorizontal: 20,
      borderRadius: 10,
      marginTop: 10,
      paddingVertical: 10,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textView: {
      fontSize: 16,
      paddingHorizontal:5,
      paddingVertical: 5,
      fontFamily: fonts.light,
      lineHeight: 20,
      color: colors.black,
    },
    ammountTextView: {
      width: width * 0.2,
      fontSize: 16,
      fontFamily: fonts.light,
      color: colors.black,
      textAlign:'right'
    },
 
    headingText: {
      width: width * 0.5,
      fontSize: 18,
      paddingHorizontal: 10,
      paddingVertical: 15,
      fontFamily: fonts.regular,
      lineHeight: 20,
      color: colors.black,
      textAlign:'left',
    },
  });
 
export default createStyle;