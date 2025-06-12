import { colors } from '@assets/colors';
import {StyleSheet} from 'react-native';
const createStyle = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      },
      pinCodeContainer: {
        width: 80,
        height: 44,
        borderWidth: 1,
        borderColor: colors.darkGrey,
        borderRadius: 2,
        textAlign: "center",
        fontSize: 18,
        backgroundColor: colors.white,
        color: colors.black
      },
      pinCodeTextStyle: {
        color: colors.black
      }
  });

export default createStyle;
