import React, { FC } from 'react';
import {
  View,
  Text,
  I18nManager,
  TouchableOpacity,
} from 'react-native';
import createStyle from './Style';
import { colors } from '@assets/colors';
import { t } from 'i18next';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

interface NavBarProps {
  title:string
}


const NavToolBar: FC<NavBarProps> = ({title}) => {
  const styles = createStyle();
  const navigation = useNavigation();
  const isRTL = I18nManager.isRTL;

  return (
    <View style={styles.headerView}>
      <View style={styles.sideContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name={isRTL ? 'chevron-forward-sharp' : 'chevron-back-sharp'}
            size={20}
            color={colors.black}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.headerText}>{title}</Text>
      </View>

      <View style={styles.sideContainer} />
    </View>
  );
};

export default NavToolBar;
