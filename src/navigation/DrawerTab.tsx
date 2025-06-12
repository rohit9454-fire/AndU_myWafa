/* eslint-disable react/no-unstable-nested-components */
import { createDrawerNavigator } from '@react-navigation/drawer';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { RootDrawerParamList } from '@navigation/navigationType';
import { createStyle } from '@navigation/Styles';
import { Dimensions, Image } from 'react-native';
import AboutScreen from '@screens/AboutScreen/About';
import Icon from 'react-native-vector-icons/Ionicons';
import MatIcon from 'react-native-vector-icons/FontAwesome';
import { colors } from '@assets/colors';
import { HomeNav, SettingsNav } from './CommonTab';
import { CustomDrawerContent, CustomHamburgerButton } from '@navigation/DrawerUI';
import { useTranslation } from 'react-i18next';
import { fonts } from '@assets/fonts';
import FindUs from '@screens/FindUs/FindUs';
import Suggestion from '@screens/Suggestions/Suggestion';
import FrequentlyAskQuestions from '@screens/FAQ/faq';
import TermCondition from '@screens/TermCondition/TermCondition';
import { Images } from '@assets/icons';
const {width} = Dimensions.get('screen');
const Drawer = createDrawerNavigator<RootDrawerParamList>();

const DrawerNavigator = () => {
  const styles = createStyle();
  const { t } = useTranslation();
  const hideDrawerHeaderForScreens = ['ProfileUpdate'];
  const shouldHideHeader = (route: any) => {
    const routeName = getFocusedRouteNameFromRoute(route) || 'HomeScreen';
    return hideDrawerHeaderForScreens.includes(routeName);
  };
  

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props: any) => <CustomDrawerContent {...props} />}
      screenOptions={({ route }) => ({
        headerShown: !shouldHideHeader(route),
        headerStyle: {
          backgroundColor: colors.white,
          height: 55,
        },
        headerTintColor: colors.black,
        drawerActiveTintColor: colors.black,
        drawerActiveBackgroundColor: colors.white,
        drawerInactiveTintColor: colors.white,
        drawerStyle: {
          backgroundColor: colors.primaryDark,
          width: width * 0.7,
        },
        drawerLabelStyle: {
          fontSize: 14,
          fontFamily: fonts.regular,
        },
        headerLeft: () => <CustomHamburgerButton />,
        swipeEnabled: false,
      })}>
      <Drawer.Screen
        name="Home"
        component={HomeNav}
        options={{
          title: '',
          drawerLabel: `${t('common:andYou')}`,
          headerShadowVisible: false,
          drawerIcon: () => (
            <Icon name="person-outline" size={20} color={colors.grey} />
          ),
        }}
      />
      <Drawer.Screen
        name="FindUs"
        component={FindUs}
        options={{
          title: '',
          drawerLabel: `${t('common:findUs')}`,
          headerShadowVisible: false,
          drawerIcon: () => (
            <Icon name="location-outline" size={20} color={colors.grey} />
          ),
        }}
      />
      <Drawer.Screen
        name="Suggestion"
        component={Suggestion}
        options={{
          title: '',
          drawerLabel: `${t('common:suggestion')}`,
          headerShadowVisible: false,
          drawerIcon: () => (
            <Icon name="chatbox-outline" size={20} color={colors.grey} />
          ),
        }}
      />
      <Drawer.Screen
        name="FrequentlyAskQuestions"
        component={FrequentlyAskQuestions}
        options={{
          title: '',
          drawerLabel: `${t('common:FAQ')}`,
          headerShadowVisible: false,
          drawerIcon: () => (
            <Icon name="help-circle-outline" size={20} color={colors.grey} />
          ),
        }}
      />
      <Drawer.Screen
        name="TermCondition"
        component={TermCondition}
        options={{
          title: '',
          drawerLabel: `${t('common:t&C')}`,
          headerShadowVisible: false,
          drawerLabelStyle: styles.tab,
          drawerIcon: () => (
            <MatIcon name="handshake-o" size={20} color={colors.grey} />
          ),
        }}
      />
       <Drawer.Screen
        name="PrivacyPolicy"
        component={TermCondition}
        options={{
          title: '',
          drawerLabel: `${t('common:privacyPolicy')}`,
          headerShadowVisible: false,
          drawerLabelStyle: styles.tab,
          drawerIcon: () =>  <Image source={Images.privacyPolicy} style={{height:25,width:25}} resizeMode={'contain'}/>
        }}
      />
      <Drawer.Screen
        name="SettingsNav"
        component={SettingsNav}
        options={{
          headerShown: true,
          title: '',
          drawerLabel: `${t('common:settings')}`,
          drawerIcon: () => (
            <Icon name="settings-outline" size={20} color={colors.grey} />
          ),
        }}
      />
      <Drawer.Screen
        name="About"
        component={AboutScreen}
        options={{
          drawerLabel: `${t('common:about')}`,
          title: '',
          drawerIcon: () => (
            <Icon name="id-card-outline" size={20} color={colors.grey} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
