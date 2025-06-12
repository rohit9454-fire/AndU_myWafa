import { colors } from '@assets/colors';
import { fonts } from '@assets/fonts';
import { Dimensions, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('screen');
const createStyle = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    scrollSpace: {
      height: height * 0.1,
    },
    balanceCard: {
      width: width * 0.95,
      height: height * 0.15,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.white,
      marginVertical: 10,
      borderWidth: 0.2,
      borderColor: colors.primaryDark,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,

      elevation: 10,
    },
    borderView: {
      height: 12,
      width: '100%',
      backgroundColor: colors.primaryDark,
      position: 'absolute',
      bottom: 0,
    },
    balanceTextView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: width * 0.88,
    },
    balanceTitle: {
      fontSize: 16,
      width: 80,
      fontFamily: fonts.regular,
      fontWeight: '400',
      color: colors.black,
    },
    ptsText: {
      fontSize: 16,
      fontFamily: fonts.regular,
      lineHeight: 20,
      fontWeight: '600',
      color: colors.yellow,
    },
    aedText: {
      fontSize: 18,
      lineHeight: 20,
      fontFamily: fonts.regular,
      fontWeight: '800',
      textAlign:'center',
      color: colors.primaryDark,
    },
    cardView: {
      height: height * 0.28,
      width: width * 0.95,
      alignItems:'center',
      justifyContent:'center'
    },
    walletBtn: {
      paddingHorizontal: 20,
      width: width * 0.75,
      borderRadius: 0,
    },
    profileText: {
      fontSize: 16,
      fontWeight: '600',
      fontFamily: fonts.regular,
      width: width * 0.95,
      textAlign: 'left',
      marginTop: 50,
      paddingVertical: 20,
      color: colors.primaryDark,
    },
    wafaNoText: {
      width: width * 0.65,
      backgroundColor: colors.white,
      padding: 5,
      alignItems: 'center',
      borderRadius: 4,
      alignSelf: 'center',
      bottom: 5,
      position: 'absolute',
    },
    wafaText: {
      color: colors.black,
      fontSize: 12,
      fontFamily: fonts.light,
    },
    barCode: {
      width: width * 0.76,
      height: 70,
      borderRadius: 5,
      backgroundColor: colors.white,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    qrCode: {
      width: 70,
      height: 70,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.white,
      position: 'absolute',
      top: 40,
      alignSelf: 'center',
    },
  });

export default createStyle;
