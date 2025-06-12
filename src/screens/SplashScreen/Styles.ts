import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '@assets/colors';

const {height, width} = Dimensions.get('screen');
const createStyle = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primaryDark
    },
    textView: {
      position: 'absolute',
      top: height * 0.1,
      width: width,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontSize: 35,
      color: colors.primaryDark,
      fontWeight: '400',
      lineHeight: 40,
    },
    textR: {
      fontSize: 12,
      color: colors.primaryDark,
      fontWeight: '300',
      position: 'absolute',
      bottom: 0,
    },
  });

export default createStyle;
