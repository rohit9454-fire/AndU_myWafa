if (__DEV__) require('react-native-devsettings');
import React, { useEffect } from 'react';
import AppNavigation from '@navigation/index';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaView, StyleSheet } from 'react-native';
import Config from 'react-native-config';


const App: React.FC = () => {
  useEffect(() => {
    if (SplashScreen) {
      console.log('print ::: ENV CHECK', Config.ENVIRONMENT)
      SplashScreen.hide();
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <AppNavigation />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
