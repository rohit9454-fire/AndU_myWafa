import {colors} from '@assets/colors';
import {fonts} from '@assets/fonts';
import {Dimensions, StyleSheet} from 'react-native';
const {width} = Dimensions.get('window');
const createStyle = () =>
  StyleSheet.create({
    container: {
      width: '80%',
      marginBottom: 10,
    },
    androidContainer: {
      width: '80%',
      height: 56,
      borderWidth: 1,
      borderColor: colors.offWhite,
      borderRadius: 5,
      marginBottom: 10,
      justifyContent: 'center',
    },
    txt: {
      color: colors.white,
    },
    pickerView: {
      backgroundColor: colors.primaryDark,
    },
    pickerTitle: {
      fontSize: 14,
      lineHeight: 14,
      fontFamily: fonts.regular,
      color: colors.black,
      backgroundColor:colors.white,
    },
    dropdownHeader: {
      borderWidth: 1,
      borderColor: colors.grey,
      padding: 10,
      borderRadius: 5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    selectedValue: {
      color: colors.black,
      fontFamily: fonts.regular,
    },
    touchBtn: {
      backgroundColor: colors.primaryDark,
      width: 200,
      height: 100,
    },

    modalSubView: {
      width: width * 0.85,
      borderRadius: 8,
      backgroundColor: colors.lightGrey,
    },
    modalContainer: {
      flex: 1,
      backgroundColor: colors.transparent,
      alignItems: 'center',
      justifyContent: 'center',
    },
    closeIcon: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 50,
      width: 50,
      alignSelf: 'flex-end',
    },
  });

export default createStyle;
