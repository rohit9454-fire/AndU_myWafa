import { colors } from '@assets/colors';
import { Dimensions, I18nManager, StyleSheet } from 'react-native';

const { width } = Dimensions.get('screen');

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
    headerView: {
      height: 50,
      width: width,
      flexDirection: 'row',
      borderBottomWidth: 0.8,
      borderBottomColor: colors.grey,
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
    },
    sideContainer: {
      width: 60,
      justifyContent: 'center',
      alignItems: 'center',
    },
    titleContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerText: {
      color: colors.black,
      fontSize: 20,
      fontWeight: '500',
      textAlign: 'center',
    },
  });

export default createStyle;
