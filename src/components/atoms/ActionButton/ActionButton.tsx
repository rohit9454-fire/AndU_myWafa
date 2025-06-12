import {I18nManager, Text, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import createStyle from '@components/atoms/ActionButton/Styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '@assets/colors';

interface ActionBtnProps {
  title: string;
  onPress: () => void;
}

const ActionButton: FC<ActionBtnProps> = ({title, onPress}) => {
  const styles = createStyle();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress()}
      activeOpacity={0.8}>
      <Text style={styles.titleText}>{title}</Text>
      <Icon
        name={
          I18nManager.isRTL ? 'chevron-back-sharp' : 'chevron-forward-sharp'
        }
        size={20}
        color={colors.primaryDark}
      />
    </TouchableOpacity>
  );
};

export default ActionButton;
