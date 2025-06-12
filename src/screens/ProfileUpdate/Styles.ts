import { colors } from '@assets/colors';
import { fonts } from '@assets/fonts';
import { Dimensions, Platform, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('window');
const createStyle = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
    scrollContainer: {
      flexGrow: 1,
      color: colors.white,
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
    txt: {
      color: colors.black,
      fontFamily: fonts.regular,
      fontSize: 14,
    },
    subContainer: {
      flex: 1,
      backgroundColor: colors.white,
    },
    logo: {
      width: width,
      height: height * 0.1,
      marginVertical: 10,
    },
    borderView: {
      width: width * 0.95,
      height: 1,
      marginVertical: 20,
      backgroundColor: colors.grey,
      alignSelf: 'center',
    },
    updateText: {
      color: colors.black,
      fontSize: 20,
      fontFamily: fonts.regular,
      alignSelf: 'center',
    },
    askQuestionText: {
      color: colors.black,
      fontSize: 16,
      fontFamily: fonts.regular,
      width: width * 0.65,
      marginVertical: 10,
    },
    formView: {
      height: height * 0.65,
      width: width * 0.8,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.grey,
      marginVertical: 10,
      alignSelf: 'center',
      alignItems: 'center',
    },
    saveBtn: {
      width: width * 0.65,
    },
    errorText:{
      color: 'red', 
      fontSize: 10,
      paddingBottom:10,
      textAlign:'left',
      width: width*0.7
    },
    dobStyle: {
      width: '70%',
      height: 54,
      fontFamily: fonts.regular,
      borderWidth: 1,
      justifyContent: 'center',
      borderColor: colors.grey,
      borderRadius: 5,
      marginTop: 10,
      padding: 10,
      color: colors.black,
    },
    mobInput: {
      width: '70%',
      height: 54,
      flexDirection: 'row',
      alignItems: 'center',
      fontFamily: fonts.regular,
      borderWidth: 1,
      borderColor: colors.grey,
      borderRadius: 5,
      marginTop: 10,
      padding: 10,
      color: colors.black,
    },
    input: {
      borderWidth: 1,
      width: width * 0.75,
      borderColor: colors.darkGrey,
      borderRadius: 2,
      padding: Platform.OS === 'android' ? 0 : 5,
      marginVertical: 4,
      fontSize: 14,
      fontFamily: fonts.regular,
      height: Platform.OS === 'ios' ? 30 : 35,
    },
    dropDownWidth: {
      width: width * 0.75,
      marginTop: Platform.OS === 'ios' ? 5 : 8,
      borderRadius: 4,
      borderColor: colors.offWhite,
      backgroundColor: Platform.OS === 'android' ? colors.darkGrey : colors.white
    },
  });

export default createStyle;
