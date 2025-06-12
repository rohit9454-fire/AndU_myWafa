import {View, Text, SafeAreaView, TouchableOpacity, Modal, Linking} from 'react-native';
import React, { useState } from 'react';
import createStyle from '@screens/SettingsScreen/Styles';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {SettingsNavList} from '@navigation/navigationType';
import { colors } from '@assets/colors';
import ActionButton from '@components/atoms/ActionButton/ActionButton';
import LanguageSettings from '@screens/LanguageSetting/languageSettings';

const SettingsScreen = () => {
  const styles = createStyle();
  const {t} = useTranslation();
  const [contactVisible, setContactVisible] = useState<boolean>(false);
  const [languageOption, setLanguageOption] = useState<boolean>(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<SettingsNavList>>();
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.txt}>{t('common:settingOptions')}</Text>
        <ActionButton
          title={t('common:changeLang')}
          onPress={() => setLanguageOption(true)}
        />
        <ActionButton
          title={t('common:contactUs')}
          onPress={() => setContactVisible(true)}
        />
         <ActionButton
          title={t('common:communicationPreference')}
          onPress={() => navigation.navigate('CommunicationPreference')}
        />
      </View>
      
      {/* Contact Us Modal  */}
      <Modal transparent={false} animationType={'slide'} visible={contactVisible}>
        <SafeAreaView>
           <TouchableOpacity style={styles.closeBtn} activeOpacity={0.8} onPress={()=>setContactVisible(false)}>
              <Icon name={'close'} color={colors.black} size={30}/>
            </TouchableOpacity>
          <View style={styles.webPageView}>
            <View style={styles.callView}>
              <TouchableOpacity style={styles.iconView} activeOpacity={0.8} onPress={()=>Linking.openURL(`tel:+971800279227`)}>
                <Icon name={'call-sharp'} color={colors.black} size={25}/>
              </TouchableOpacity>
              <View style={styles.phoneView}>
                <Text style={styles.phoneText}>800 &U (279 227)</Text>
                <Text style={styles.phoneText}>(8AM -8PM)</Text>
              </View>
            </View>
            <View style={styles.callView}>
              <TouchableOpacity style={styles.iconView} activeOpacity={0.8} onPress={()=>Linking.openURL(`mailto:customer.complaint@gmg.com?subject=Support Request&body=Hello, I need help with...`)}>
                <Icon name={'mail'} color={colors.black} size={25}/>
              </TouchableOpacity>
              <View style={styles.phoneView}>
                <Text style={styles.phoneText}>customer.complaint@gmg.com</Text>
              </View>
            </View>
          </View>
          </SafeAreaView>
      </Modal>

      {/* Language Option Modal  */}
      <Modal transparent={false} animationType={'slide'} visible={languageOption}>
          <SafeAreaView style={styles.webPageView}>
            <TouchableOpacity style={styles.closeBtn} activeOpacity={0.8} onPress={()=>setLanguageOption(false)}>
              <Icon name={'close'} color={colors.black} size={30}/>
            </TouchableOpacity>
            <LanguageSettings/>
          </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

export default SettingsScreen;
