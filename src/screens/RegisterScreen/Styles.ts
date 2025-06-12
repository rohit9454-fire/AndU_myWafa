import { colors } from '@assets/colors';
import { fonts } from '@assets/fonts';
import { Dimensions, Platform, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('screen');
const createStyle = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: colors.white,
    },
    scrollContainer: {
      flexGrow: 1,
      backgroundColor: colors.white,
    },
    logoView: {
      borderBottomColor: colors.lightGrey,
      borderBottomWidth: 1,
      marginVertical: height * 0.015,
      width: width * 0.9,
    },
    logo: {
      width: width,
      height: height * 0.1,
      marginTop: 15
    },
    description: {
      fontSize: Platform.OS === 'android' ? 13 : 16,
      lineHeight: 20,
      color: colors.black,
      textAlign: 'center',
      width: width * 0.835,
      paddingVertical: 30,
      fontFamily: fonts.light,
    },
    formView: {
      width: width * 0.725,
      borderWidth: 1,
      marginTop: 10,
      padding: 20,
      borderColor: colors.grey,
      borderRadius: 5,
    },
    register: {
      fontSize: 18,
      fontFamily: fonts.regular,
      color: colors.primaryDark,
      paddingVertical: 10,
      textAlign: 'left',
      width: width * 0.55,
    },
    input: {
      borderWidth: 1,
      width: width * 0.62,
      borderColor: colors.darkGrey,
      borderRadius: 2,
      padding: Platform.OS === 'android' ? 0 : 10,
      marginVertical: 4,
      fontSize: 14,
      fontFamily: fonts.regular,
      justifyContent: 'center',
      height: Platform.OS === 'ios' ? 40 : 55,
    },
    mobInput: {
      borderWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: width * 0.62,
      borderColor: colors.darkGrey,
      borderRadius: 2,
      alignItems: 'center',
      fontSize: 14,
      fontFamily: fonts.regular,
      marginVertical: 4,
      padding: Platform.OS === 'android' ? 0 : 10,
      height: Platform.OS === 'ios' ? 40 : 55,
    },
    btnNext: {
      width: '75%',
      alignSelf: 'center',
    },
    errorText:{
      color: 'red', 
      fontSize: 10
    },
    loginRedirect: {
      height: height * 0.075,
      width: width * 0.62,
      alignSelf: 'center',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
    },
    alreadyText: {
      fontSize: 14,
      color: colors.primaryDark,
      width: width * 0.25,
      fontFamily: fonts.regular,
    },
    loginBtn: {
      width: width * 0.25,
      height: 30,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: colors.primaryDark,
      alignItems: 'center',
      justifyContent: 'center',
    },
    loginText: {
      fontSize: 14,
      fontFamily: fonts.regular,
      color: colors.primaryDark,
    },
    dropDownWidth: {
      width: width * 0.62,
      marginTop: Platform.OS === 'ios' ? 3 : 6,
      borderRadius: 2,
      alignSelf: 'center',
      borderColor: colors.darkGrey,
    },
    iosView: {
      height: Platform.OS === 'ios' ? 280 : 0,
    },
  });

export default createStyle;
