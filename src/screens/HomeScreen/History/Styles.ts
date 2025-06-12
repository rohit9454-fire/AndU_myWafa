import { colors } from '@assets/colors';
import { fonts } from '@assets/fonts';
import { Dimensions, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('screen');
const createStyle = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.grey,
    },
    subContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginStart: 4,
      marginEnd: 4,
    },
    renderContainer: {
      flex: 1,
      backgroundColor: colors.white,
      flexDirection: 'row',
      width: width * 0.95,
      height: height * 0.1,
      borderRadius: 10,
      marginTop: 10,
      paddingVertical: 10,
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'space-between',
    },
    textView: {
      width: width * 0.4,
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 5,
      fontFamily: fonts.light,
      lineHeight: 20,
      color: colors.black,
    },
    iconView: {
      marginHorizontal: 10,
    },
    headingText: {
      fontSize: 18,
      paddingHorizontal: 10,
      paddingVertical: 15,
      fontFamily: fonts.regular,
      lineHeight: 20,
      color: colors.black,
    },
    flatListView: {
      height: height - (height * 0.275),
      width: width,
      alignSelf: 'center',
      paddingBottom: height > 700 ? 5 : height * 0.1
    },
    listContainer: {
      padding: 16,
    },
    itemContainer: {
      alignItems: 'center',
      marginStart: 12,
      marginEnd: 12,
      marginBottom: 4,
      backgroundColor: '#fff',
      padding: 12,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    logo: {
      width: 62,
      height: 62,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.offWhite,
      marginRight: 12,
    },
    textContainer: {
      width: width * 0.8,
      alignItems: 'center',
      flexDirection: 'row'
    },
    title: {
      fontSize: 14,
      fontWeight: 'bold',
      color: colors.black,
      fontFamily: fonts.light,
      textAlign: 'left'
    },
    subtitle: {
      fontSize: 12,
      color: '#555',
      textAlign: 'left',
      marginTop: 5,
      fontFamily: fonts.light,
    },
    date: {
      fontSize: 12,
      color: '#555',
      marginTop: 4,
      fontFamily: fonts.light,
      textAlign: 'left'
    },
    errorView: {
      height: height * 0.6,
      width: width,
      alignItems: 'center',
      justifyContent: 'center',
    },
    errorText: {
      fontFamily: fonts.regular,
      fontSize: 16,
      textAlign: 'center',
    },
  });

export default createStyle;
