/* eslint-disable no-undef */
import {
  View,
  TextInput,
  KeyboardTypeOptions,
  I18nManager,
  Text,
} from 'react-native';
import React, {FC} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '@assets/colors';
import createStyle from './Styles';

interface InputProps {
  editable?: boolean;
  placeHolder: string;
  val: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
  customStyle?: StyleMedia;
  container?: StyleMedia;
  titleText?: StyleMedia;
  validationFunction?: (val: string) => string;
  setVal: (val: string) => void;
  iconName?: string;
  title?: string;
  isFull?: boolean;
  inputWidth?: number;
  isPassword?: boolean;
  iconColor?: string;
}

const Input: FC<InputProps> = ({
  placeHolder,
  val,
  setVal,
  customStyle,
  container,
  titleText,
  editable,
  keyboardType,
  maxLength,
  secureTextEntry,
  iconName,
  title,
  inputWidth,
  isPassword,
  iconColor,
}) => {
  const styles = createStyle();
  return (
    <View style={container}>
      {title && <Text style={titleText}>{title}</Text>}
      <View style={customStyle}>
        {iconName && !isPassword && (
          <Icon name={iconName} size={22} color={colors.primaryDark} />
        )}
        {(placeHolder==='Mobile Number')&&<Text style={styles.phoneText}>+971</Text>}
        {(placeHolder ==='رقم الهاتف') && <Text style={styles.phoneText}>+971</Text> }
        <TextInput
          placeholder={placeHolder}
          placeholderTextColor={colors.darkGrey}
          value={val}
          editable={editable}
          maxLength={maxLength}
          secureTextEntry={secureTextEntry}
          textAlign={I18nManager?.isRTL ? 'right' : 'left'}
          onChangeText={text => {
            setVal(text.toString());
          }}
          style={[styles.inputView, {width: inputWidth}]}
          keyboardType={keyboardType}
        />
        {iconName && isPassword && (
          <Icon
            name={iconName}
            size={22}
            color={iconColor ? iconColor : colors.primaryDark}
          />
        )}
      </View>
    </View>
  );
};

export default Input;
