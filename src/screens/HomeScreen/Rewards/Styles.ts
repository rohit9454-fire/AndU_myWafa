import { colors } from '@assets/colors';
import { fonts } from '@assets/fonts';
import { Dimensions, Platform, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('screen');
const createStyle = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
      alignItems: 'center',
    },
    headerView: {
      flexDirection: 'row',
      width: width * 0.25,
      marginTop: 20,
      alignSelf: 'flex-start',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    modalHeaderView: {
      flexDirection: 'row',
      width: width,
      marginTop: 20,
      alignSelf: 'flex-start',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    iconView: {
      marginHorizontal: 10,
    },
    headerLogo: {
      height: 40,
      width: 80,
      resizeMode: 'contain',
    },
    tabItem: {
      alignItems: 'center',
      height: Platform.OS === 'ios' ? 25 : 30,
      paddingHorizontal: 10,
    },
    activeTabItem: {
      borderBottomColor: colors.primaryDark,
      borderBottomWidth: 1,
    },
    tabText: {
      fontSize: Platform.OS === 'ios' ? 12 : 14,
      width: 120,
      textAlign: 'center',
      fontFamily: fonts.regular,
      color: colors.black,
    },
    tabContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: colors.white,
      paddingVertical: 15,
    },
    subContainer: {
      height: height * 0.8,
      width: width,
    },
    subListView: {
      height: height * 0.7
    },
    titleView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around'
    },
    headingText: {
      width: width * 0.85,
      fontSize: 18,
      paddingHorizontal: 10,
      paddingVertical: 15,
      fontFamily: fonts.regular,
      lineHeight: 20,
      color: colors.black,
    },
    dateText: {
      fontFamily: fonts.light,
      fontSize: 12,
      lineHeight: 14,
      marginTop: 2,
      color: colors.gray,
      textAlign: 'left'
    },
    flatListView: {
      backgroundColor:'red'
    },
    logo: {
      width: 62,
      height: 62,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.offWhite,
      marginRight: 12,
    },
    textView: {
      fontSize: 14,
      fontWeight: '700',
      lineHeight: 20,
      color: colors.black,
    },
    titleText: {
      fontFamily: fonts.regular,
      fontSize: 16,
      paddingVertical: 10,
      color: colors.black,
      fontWeight: 'bold',
      textAlign:'left'
    },
    renderContainer: {
      flex: 1,
      paddingHorizontal: 15,
      paddingVertical: 15,
      flexDirection: 'row',
      backgroundColor: colors.white,
      width: width,
      alignItems: 'center',
      justifyContent: 'space-between',
      alignSelf: 'center',
      borderBottomColor: colors.lightGrey,
      borderBottomWidth: 1,
    },
  });

export default createStyle;
