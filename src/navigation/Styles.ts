import { colors } from '@assets/colors';
import { fonts } from '@assets/fonts';
import { Dimensions, I18nManager, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('window');
export const createStyle = () =>
  StyleSheet.create({
    headerView: {
      flexDirection: 'row',
      width: width * 0.225,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    iconView: {
      marginHorizontal: 10,
    },
    headerLogo: {
      height: 35,
      width: 35,
      resizeMode: 'contain',
    },
    header: {
      height: height * 0.15,
      width: '100%',
      alignSelf: 'center',
      alignItems: 'center',
      backgroundColor:colors.white,
      justifyContent: "center",
      paddingHorizontal: 25,
    },
    logo: {
      width: 65,
      height: 65,
      resizeMode: 'contain',
    },
    storeText: {
      color: colors.black,
      fontSize: 16,
      width: width * 0.5,
      textAlign:'center',
      fontFamily: fonts.regular,
      fontWeight: '500',
    },
    subText: {
      color: colors.primaryDark,
      fontSize: 16,
      fontWeight: '400',
      fontFamily: fonts.regular,
    },
    footer: {
      width: width * 0.25,
      flexDirection: 'row',
      marginLeft: 15,
      justifyContent: 'space-evenly',
    },
    socialIcon: {
      padding: 10,
    },
    drawerStyle: {
      backgroundColor: colors.primaryDark,
      width: width * 0.7,
    },
    btnView: {
      height: 30,
      width: 60,
      margin: 5,
      alignSelf: 'flex-start',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    signBtn: {
      borderWidth: 1,
      borderColor: colors.white,
      width: width * 0.5,
      borderRadius: 5,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    signText: {
      color: colors.white,
      fontSize: 16,
      fontFamily: fonts.regular,
      padding: 10,
    },
    bottomView: {
      marginTop: height * 0.15,
    },
    tab: { 
      marginLeft: -8,
      fontSize: 14,
      fontFamily: fonts.regular
     }
  });
