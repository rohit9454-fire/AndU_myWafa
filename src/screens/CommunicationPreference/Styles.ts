import { colors } from '@assets/colors';
import {fonts} from '@assets/fonts';
import {Dimensions, I18nManager, Platform, StyleSheet} from 'react-native';

const {width} = Dimensions.get('screen');

const createStyle = () =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    subContainer: {
      width: width * 0.85,
      alignSelf: 'center',
      marginTop: 50,
    },
    text: {
      fontFamily: fonts.regular,
      marginBottom: 16,
      color: colors.black  
    },
    seprator: {
      height: 1,
      backgroundColor: colors.lightGrey,
    },
    radioItem: {
      flexDirection: 'row',
      alignItems: 'center',
      },
      radioCircle: {
        height: 22,
        width: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: '#000',
        marginRight: 8,
        alignItems: 'center',
        justifyContent: 'center',
      },
      radioSelected: {
        backgroundColor: '#000',
      },
      radioContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 30,
      },
      radioLabel: {
        fontSize: 16,
        color: colors.black
      },
      radioOuterCircle: {
        height: 20,
        width: 20,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        marginRight: 8,
      },
      radioInnerCircle: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: '#000',
      },
      buttonStyle: {
        height: 50,
        marginVertical: 40
      },
      titleStyle: {
        marginVertical : Platform.OS === 'ios' ? 8 : 0
      },
      checkboxGrid: {
        paddingTop: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: I18nManager.isRTL ? width * 0.75 : width * 0.6,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'flex-end',
      },
      checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '48%',
        marginBottom: 16,
      },
      checkbox: {
        height: 20,
        width: 20,
        borderWidth: 2,
        borderColor: '#000',
        marginRight: 12,
      },
      checkboxChecked: {
        backgroundColor: '#000',
      },
      checkMark: {
        width: 10,
        height: 10,
        backgroundColor: '#fff',
      },
      checkboxLabel: {
        fontSize: 14,
        color: colors.black,
      },
      preferredChannelText: {
        alignSelf : 'center',
        fontWeight: 'bold',
        marginTop : 20,
        color: colors.black
      }
  });
 
export default createStyle;