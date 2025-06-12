import {colors} from '@assets/colors';
import {fonts} from '@assets/fonts';
import {Dimensions, StyleSheet} from 'react-native';
const {width, height} = Dimensions.get('window');
const createStyle = () =>
  StyleSheet.create({
    container: {
      width: width,
      alignSelf: 'center',
      alignItems: 'center',
    },
    txt: {
      color: colors.black,
      fontSize: 18,
      fontFamily: fonts.light,
      width: width * 0.925,
      marginVertical: 15
    },
    webPageView: {
      height: height * 0.8,
      width: width,
      justifyContent: 'center',
      alignSelf: 'center'
    },
    closeBtn:{
      height: 35,
      width: 35,
      alignItems:'center',
      justifyContent:'center',
      alignSelf: 'flex-end',
    },
    langText:{
      fontSize: 16,
      color: colors.black,
      fontWeight: '600',
      fontFamily: fonts.light,
      paddingVertical: 20,
      paddingHorizontal: 20
    },
    callView:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      width: width * 0.7,
      height:45,
      alignSelf: 'center',
    },
    phoneView: {
      width: width * 0.575,
    },
    phoneText:{
      fontSize: 14,
      fontFamily:fonts.regular,
      color:colors.black
    },
    iconView:{
      height:30,
      width: 30,
      alignItems:'center',
      justifyContent:'center',
    }
  });

export default createStyle;
