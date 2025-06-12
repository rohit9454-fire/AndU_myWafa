import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackParamList } from '@navigation/navigationType';
import DrawerNavigator from '@navigation/DrawerTab';
import StackNav from '@navigation/StackTab';
import Splash from '@screens/SplashScreen/Splash';
import LanguageSelectionScreen from '@screens/LanguageSelection/LanguageSelectionScreen';
import CommunicationPreference from '@screens/CommunicationPreference/CommunicationPreference';
import { BackArrow } from './CommonTab';

const Stack = createNativeStackNavigator<StackParamList>();
const renderBackArrow = () => <BackArrow />;

const AppNavigation = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="Splash">
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen
            name="Language"
            options={{
              gestureEnabled: false,
              headerShown: false,
            }}
            component={LanguageSelectionScreen}
          />
          <Stack.Screen
            name="CommunicationPreference"
            component={CommunicationPreference}
          />
          <Stack.Screen
            name="Main"
            component={StackNav}
            options={{
              gestureEnabled: false,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Drawer"
            component={DrawerNavigator}
            options={{
              gestureEnabled: false,
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppNavigation;
