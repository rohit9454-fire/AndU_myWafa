import { View, Text, TouchableOpacity, SafeAreaView, BackHandler, Alert, NativeModules } from 'react-native';
import React, { useEffect, useState } from 'react';
import createStyle from '@screens/HomeScreen/Styles';
import { useTranslation } from 'react-i18next';
import MyAccount from '@screens/HomeScreen/MyAccount/MyAccount';
import History from '@screens/HomeScreen/History/History';
import Rewards from '@home/Rewards/Rewards';
import MyPoints from '@home/MyPoints/MyPoints';
import { colors } from '@assets/colors';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '@navigation/navigationType';
import { getAllowNavigationReset } from '@navigation/NavigationGuard';

const HomeScreen = () => {
  const [activeTab, setActiveTab] = useState<string>('myAccount');
  const [preActiveTab, setPreActiveTab] = useState<string>('');
  const [rewardOpen, setRewardOpen] = useState<boolean>(false);
  const langTabs = ['myAccount', 'history', 'rewards', 'myPoints'];
  const styles = createStyle();
  const { t } = useTranslation();
  const { ExitApp } = NativeModules;
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  useEffect(() => {
    const unsbscribe = navigation.addListener('beforeRemove', e => {
      if (getAllowNavigationReset()) return; // allow - the default behavior of back button
      
      e.preventDefault(); // to stop default behavior of android hardware back button
      ExitApp.showExitDialog(); // Android Native Module for Exit app dialog box. 
    })
    return unsbscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.screenView}>
      <View style={styles.container}>
        {langTabs.map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabItem, activeTab === tab && styles.activeTabItem]}
            onPress={() => {
              if (tab === 'rewards') {
                setRewardOpen(true);
              }
              if (tab !== 'rewards') {
                setPreActiveTab(tab);
              }
              setActiveTab(tab);
            }}>
            <Text style={[styles.tabText, { color: activeTab === tab ? colors.primaryDark : colors.black }]}>{t(`common:${tab}`)}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.subContainer}>
        {activeTab === 'myAccount' && <MyAccount />}
        {activeTab === 'history' && <History />}
        {activeTab === 'rewards' && (
          <Rewards
            isOpen={rewardOpen}
            setRewardOpen={setRewardOpen}
            setActiveTab={setActiveTab}
            preActiveTab={preActiveTab}
          />
        )}
        {activeTab === 'myPoints' && <MyPoints />}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
