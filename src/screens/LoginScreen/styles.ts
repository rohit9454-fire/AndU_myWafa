import { colors } from '@assets/colors';
import { fonts } from '@assets/fonts';
import { Dimensions, StyleSheet } from 'react-native';
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
      alignItems: 'center',
    },
    logo: {
      width: width,
      height: height * 0.175,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoUI:{
      height: 100,
      width: 100
    },
    headerView: {
      height: 50,
      width: width,
      borderBottomWidth: 0.8,
      justifyContent: 'center',
      borderBottomColor: colors.grey,
    },
    headerText: {
      color: colors.black,
      textAlign: 'center',
      fontSize: 20,
      fontWeight: '500',
    },
    loginWithView: {
      width: width * 0.9,
      height: height * 0.05,
      backgroundColor: 'red',
      alignItems: 'center',
      justifyContent: 'center',
    },
    radioContainer: {
      flexDirection: 'row',
      width: width * 0.9,
      height: height * 0.08,
      justifyContent: 'space-between',
    },
    radioOption: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    radioCircle: {
      width: 12,
      height: 12,
      borderRadius: 6,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: colors.primaryDark,
      marginRight: 8,
    },
    radioCircleSelected: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.primaryDark,
    },
    radioText: {
      fontSize: 12,
      color: colors.black,
      fontFamily: fonts.regular,
    },
    loginInputs: {
      width: width * 0.9,
      height: height * 0.25,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    input: {
      borderWidth: 1,
      width: width * 0.9,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderColor: colors.darkGrey,
      borderRadius: 2,
      padding: 10,
      marginBottom: 15,
      fontSize: 16,
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    checkbox: {
      width: 20,
      height: 20,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: colors.primaryDark,
      marginRight: 8,
    },
    checkboxText: {
      fontSize: 14,
      color: colors.black,
      fontFamily: fonts.regular,
    },
    rememberView: {
      width: width * 0.9,
    },
    btnStyle: {
      width: width * 0.85,
      alignSelf: 'center',
      justifyContent:'center',
      height: 45,
    },
    bottomView: {
      height: height * 0.25,
      width: width * 0.9,
    },
    registerView: {
      flexDirection: 'row',
      paddingVertical: 20,
    },
    registerText: {
      color: colors.primaryDark,
      fontSize: 14,
      fontWeight: '600',
      paddingHorizontal: 15,
      fontFamily: fonts.regular,
    },
    footerView: {
      height: 50,
      width: width * 0.9,
      alignItems: 'center',
      justifyContent: 'center',
    },
    footerText: {
      fontSize: 10,
      lineHeight: 10,
      fontWeight: '400',
    },
    mywafaC: {
      fontSize: 10,
      color: colors.darkGrey,
      marginBottom: 15,
      fontFamily: fonts.regular,
    },
    webPageView: {
      height: height,
      width: width,
    },
    closeBtn:{
      height: 35,
      width: 35,
      alignItems:'center',
      justifyContent:'center',
      alignSelf: 'flex-end',
    },
    errorText: {
      color: 'red',
      fontSize: 14,
    },
  });

export default createStyle;
