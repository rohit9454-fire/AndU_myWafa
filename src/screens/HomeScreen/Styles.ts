import { colors } from '@assets/colors';
import { fonts } from '@assets/fonts';
import { Platform, StyleSheet } from 'react-native';

const createStyle = () =>
  StyleSheet.create({
    screenView: {
      flex: 1,
      backgroundColor: colors.white,
    },
    container: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: colors.white,
      paddingVertical: 15,
    },
    activeTabItem: {
      borderBottomColor: colors.primaryDark,
      borderBottomWidth: 1,
    },
    subContainer: {
      flex: 1,
    },
    tabItem: {
      alignItems: 'center',
      height: Platform.OS === 'ios' ? 35 : 40,
      paddingHorizontal: 10,
    },
    tabText: {
      fontSize: 12,
      fontFamily: fonts.regular,
      width: 95,
      textAlign: 'center',
      color: colors.black,
    },
  });

export default createStyle;
