import {View, Alert} from 'react-native';
import React, {FC, useEffect} from 'react';

interface AlertProps {
  title: string;
  message?: string;
  cancel?: string;
  ok?: string;
  onCancel?: () => void;
  onOK?: () => void;
  data?: any[];
}

const AlertView: FC<AlertProps> = ({
  title,
  message,
  cancel,
  ok,
  data,
  onCancel,
  onOK,
}) => {
  useEffect(() => {
      const buttons = [
        {
          text: ok,
          onPress: onOK,
        },
        cancel && {
          text: cancel,
          onPress: onCancel,
        },
       
      ].filter(Boolean);
      Alert.alert(title, message, buttons as any[], {cancelable: true});
  }, [data]);
  return <View />;
};

export default AlertView;
