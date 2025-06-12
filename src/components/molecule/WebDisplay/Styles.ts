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
    headerView: {
      flexDirection: 'row',
      width: width * 0.3,
      alignSelf: 'flex-start',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    iconView: {
      marginHorizontal: 10,
    },
    headerLogo: {
      height: 40,
      width: 80,
      marginTop: 10,
      resizeMode: 'contain',
    },
  });
