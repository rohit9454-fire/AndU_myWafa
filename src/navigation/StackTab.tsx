import {useTranslation} from 'react-i18next';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackParamList} from '@navigation/navigationType';
import Login from '@screens/LoginScreen/Login';
import Register from '@screens/RegisterScreen/Register';
import OtpScreen from '@screens/OtpScreen/OtpScreen';

const Stack = createNativeStackNavigator<StackParamList>();

const StackNav = () => {
  const {t} = useTranslation();
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="Otp"
        component={OtpScreen}
      />
      <Stack.Screen
        name="Register"
        component={Register}
      />
    </Stack.Navigator>
  );
};
export default StackNav;
