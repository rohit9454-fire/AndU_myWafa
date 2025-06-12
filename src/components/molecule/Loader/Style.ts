import { colors } from '@assets/colors';
import {StyleSheet} from 'react-native';
const createStyle = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      top: 0,
      justifyContent: 'center',
      alignItems: 'center',
      },
  });

export default createStyle;
