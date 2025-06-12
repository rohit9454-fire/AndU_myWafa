import {colors} from '@assets/colors';
import {fonts} from '@assets/fonts';
import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('screen');
const createStyle = () =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: colors.white,
    },
    logoView: {
      borderBottomColor: colors.lightGrey,
      borderBottomWidth: 1,
      alignSelf: 'center',
      marginVertical: height * 0.015,
      width: width * 0.9,
    },
    container: {
      marginTop: 240,
      marginBottom: 20,
    },
    logo: {
      width: width,
      height: height * 0.1,
    },
    headingEng: {
      alignSelf: 'center',
      fontSize: 15,
      lineHeight:20,
      height: 25,
      fontWeight: '300',
      color: colors.black,
      fontFamily: fonts.regular,
    },
    headingAr: {
      alignSelf: 'center',
      fontSize: 15,
      height: 20,
      marginBottom: 8,
      fontFamily: fonts.regular,
    },
  });

export default createStyle;
