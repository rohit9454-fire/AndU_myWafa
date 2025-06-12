import { colors } from '@assets/colors';
import { fonts } from '@assets/fonts';
import { Dimensions, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('screen');
const createStyle = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 12,
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'space-between',
    },
    otpText: {
      fontFamily: fonts.regular,
      fontSize: 16,
      textAlign:'center',
      padding: 20,
      color: colors.black
    },
    logoStyle: {
      height:100,
      width:100,
      resizeMode: 'contain',
      alignSelf: 'center'
    },
    otpContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 20,
      paddingHorizontal: 20,
    },
    viewStyle: {
      height: 1,
      width: width * 0.6,
      backgroundColor: colors.darkGrey,
      alignSelf: 'center'
    },
    inputBox: {
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
    phoneText: {
      fontSize: 16,
      fontFamily: fonts.regular,
      marginBottom: 12,
      marginEnd: 32,
      color: colors.black
    },
    emailText: {
      fontSize: 16,
      fontFamily: fonts.regular,
      marginBottom: 12,
      marginEnd: 22,
      color: colors.black
    },
    textBlock: {
      padding: 20,
      marginTop: 20
    },
    textContainer: {
      flexDirection: 'row',
      marginBottom: 10
    },
    buttonStyle: {
      width: width * 0.85,
      marginBottom: 20
    },
    resendOtp: {
      width: width * 0.3,
      backgroundColor: colors.primaryDark,
      fontFamily: fonts.regular,
      borderRadius: 1,
      shadowOpacity: 0.2
    },
    resendOtpDisable: {
      width: width * 0.3,
      backgroundColor: colors.white,
      fontFamily: fonts.regular,
      borderRadius: 1,
      shadowOpacity: 0.2
    },
    resendOtpTitle: {
      color: colors.white,
    },
    resendOtpTitleDisable: {
      color: colors.black
    },
    timerBlock: {
      width: width * 0.85,
      alignSelf:"center",
      flexDirection: 'row',
      justifyContent: 'space-between',
      color: colors.black
    },
    timerText: {
      marginTop: 10
    }
  });

export default createStyle;
