import { colors } from '@assets/colors';
import {fonts} from '@assets/fonts';
import {Dimensions, StyleSheet} from 'react-native';
const {width}=Dimensions.get('screen');
const createStyle = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    subContainer:{
      flexDirection: 'row',
      width: width*0.85,
      marginVertical: 10,
      alignItems: "center",
      justifyContent: "space-between"
    },
    text: {
      fontSize: 16,
      fontFamily: fonts.regular,
      width: width*0.4,
      color: colors.primaryDark
    },
  });
 
export default createStyle;