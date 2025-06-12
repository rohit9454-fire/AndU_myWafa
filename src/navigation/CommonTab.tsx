import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  HomeNavList,
  ProfileNavList,
  SettingsNavList,
} from '@navigation/navigationType';
import LanguageSettings from '@screens/LanguageSetting/languageSettings';
import SettingsScreen from '@screens/SettingsScreen/Settings';
import MyAccount from '@home/MyAccount/MyAccount';
import MyPoints from '@home/MyPoints/MyPoints';
import HomeScreen from '@screens/HomeScreen/Home';
import History from '@home/History/History';
import ProfileUpdate from '@screens/ProfileUpdate/ProfileUpdate';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {I18nManager, TouchableOpacity} from 'react-native';
import {colors} from '@assets/colors';
import {createStyle} from '@navigation/Styles';
import {useTranslation} from 'react-i18next';
const Stack = createNativeStackNavigator<SettingsNavList>();
const HomeStack = createNativeStackNavigator<HomeNavList>();


export const BackArrow = () => {
  const styles = createStyle();
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.btnView}
      onPress={() => navigation.goBack()}>
      <Icon
        name={
          I18nManager.isRTL ? 'chevron-forward-sharp' : 'chevron-back-sharp'
        }
        size={16}
        color={colors.black}
      />
    </TouchableOpacity>
  );
};
const renderBackArrow = () => <BackArrow />;

export const SettingsNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Settings">
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LanguageSettings"
        component={LanguageSettings}
        options={{
          headerShown: false,
          title: 'Language',
        }}
      />
    </Stack.Navigator>
  );
};

export const HomeNav = () => {
  const {t} = useTranslation();
  return (
    <HomeStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="HomeScreen">
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="myAccount"
        component={MyAccount}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="myPoints"
        component={MyPoints}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="history"
        component={History}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="ProfileUpdate"
        component={ProfileUpdate}
      />
    </HomeStack.Navigator>
  );
};

