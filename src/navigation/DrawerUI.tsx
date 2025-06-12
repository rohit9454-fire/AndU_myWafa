import React, {useEffect, useState} from 'react';
import {
  DrawerNavigationProp,
  DrawerItemList,
  DrawerContentScrollView,
  useDrawerStatus,
} from '@react-navigation/drawer';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {createStyle} from '@navigation/Styles';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {RootDrawerParamList, StackParamList} from './navigationType';
import {colors} from '@assets/colors';
import {Images} from '@assets/icons';
import {useTranslation} from 'react-i18next';
import {clearUserData, getUserData} from '@services/utils/LocalStore/UserDetailsStore';
import {StackNavigationProp} from '@react-navigation/stack';
import WebDisplay from '@components/molecule/WebDisplay/WebDisplay';
import { useEncryptedConfig } from '@services/utils/LocalStore/ConfigeStore';
import { clearOtpFlag } from '@services/utils/LocalStore/VerifyOtpStore';
import { clearTransactionDetails } from '@services/utils/LocalStore/TransactionStore';
import { setAllowNavigationReset } from './NavigationGuard';

export const CustomHamburgerButton = () => {
  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();
  const styles = createStyle();
  return (
    <View style={styles.headerView}>
      <TouchableOpacity
        onPress={() => navigation.toggleDrawer()}
        style={styles.iconView}>
        <Icon name="menu" size={26} color={colors.primaryDark} />
      </TouchableOpacity>
      <Image source={Images.wafaLogo} style={styles.headerLogo} />
    </View>
  );
};

export const CustomDrawerContent = (props: any) => {
  const [name, setName] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [link, setLink] = useState<string|undefined>('');
  const { configData } = useEncryptedConfig();
  const socialLink = [
    {link: configData?.facebook, site: 'face'},
    {link: configData?.instagram, site: 'int'},
    {
      link: configData?.x,
      site: 'x',
    },
  ];
  const styles = createStyle();
  const {t} = useTranslation();
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const drawerStatus = useDrawerStatus();

  const handleLogOut = async () => {
    await clearUserData();
    await clearTransactionDetails();
    await clearOtpFlag();
    setAllowNavigationReset(true); 
    navigation.dispatch(
      CommonActions.reset({
        routes: [{name: 'Main'}],
      })
    );
  };

  useEffect(() => {
    if (drawerStatus === 'open') {
      getUserDetails();
    }
  }, [drawerStatus, navigation]);

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    const res = await getUserData();
    if (res) {
      setName(JSON.parse(res)?.memberName);
    }
  };

  const handleLink = async (site: string) => {
    const data = await socialLink.find(item => item?.site === site);
    if (data) {
      setLink(data?.link);
      setIsOpen(true);
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <Image source={Images.wafaLogo} style={styles.logo} />
        <Text style={styles.storeText}>{name}</Text>
      </View>
      <DrawerItemList {...props} />
      <View style={styles.bottomView}>
        <TouchableOpacity
          style={styles.signBtn}
          activeOpacity={0.8}
          onPress={handleLogOut}>
          <Text style={styles.signText}>{t('common:signOut')}</Text>
        </TouchableOpacity>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.socialIcon}
            onPress={() => handleLink('face')}>
            <Icon name="logo-facebook" size={20} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialIcon}
            onPress={() => handleLink('int')}>
            <Icon name="logo-instagram" size={20} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialIcon}
            onPress={() => handleLink('x')}>
            <Icon name="logo-twitter" size={20} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>
      {isOpen && link && (
        <WebDisplay isOpen={isOpen} setIsOpen={setIsOpen} item={link} />
      )}
    </DrawerContentScrollView>
  );
};
