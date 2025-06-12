/* eslint-disable no-undef */
import React, {FC} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import createStyle from './Styles';

interface IButtonProps {
  title: String;
  onPress: () => void;
  titleStyle?: StyleMedia;
  disabled?:boolean;
  customStyle?: StyleMedia;
}
export const Button: FC<IButtonProps> = (props: IButtonProps) => {
  const style = createStyle();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={props.disabled}
      style={[style.container, props.customStyle]}
      onPress={props?.onPress}>
      <Text style={[style.title, props.titleStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
};
