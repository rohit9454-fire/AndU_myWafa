import {colors} from '@assets/colors';
import {Dimensions, StyleSheet} from 'react-native';
const {height, width} = Dimensions.get('screen');

export const createStyle = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
    webPageView: {
      height: height * 0.85,
      width: width,
    },
  });
