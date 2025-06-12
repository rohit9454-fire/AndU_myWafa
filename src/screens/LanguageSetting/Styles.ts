import {colors} from '@assets/colors';
import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('screen');
const createStyle = () =>
  StyleSheet.create({
    headContainer: {
      flex: 1,
      backgroundColor: colors.white,
    },
    container: {
      marginTop: 240,
      marginBottom: 20,
    },
    headingEng: {
      alignSelf: 'center',
      fontSize: 15,
      height: 20,
      fontWeight: '300',
      color: colors.black,
    },
    logo: {
      width: width,
      height: height * 0.1,
    },
  });

export default createStyle;
