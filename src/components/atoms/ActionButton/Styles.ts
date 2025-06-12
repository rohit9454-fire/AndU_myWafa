import {colors} from '@assets/colors';
import {fonts} from '@assets/fonts';
import {Dimensions, StyleSheet} from 'react-native';
const {width} = Dimensions.get('window');
const createStyle = () =>
  StyleSheet.create({
    container: {
      marginVertical: 5,
      height: 50,
      width: width * 0.925,
      borderRadius: 2,
      padding: 10,
      backgroundColor: colors.white,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,

      elevation: 4,
    },
    titleText: {
      fontSize: 16,
      fontFamily: fonts.regular,
      color: colors.black,
      fontWeight: '500',
    },
  });

export default createStyle;
