import {
  SafeAreaView,
  Modal,
  View,
  TouchableOpacity,
  I18nManager,
  Image,
} from 'react-native';
import {createStyle} from './Styles';
import React, {FC} from 'react';
import WebView from 'react-native-webview';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '@assets/colors';
import {Images} from '@assets/icons';

export interface ModalProps {
  item: string;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

const WebDisplay: FC<ModalProps> = ({item, isOpen, setIsOpen}) => {
  const styles = createStyle();
  const closeDrawerAndModal = () => {
    setIsOpen(false);
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const Header = () => {
    return (
      <View style={styles.headerView}>
        <TouchableOpacity onPress={closeDrawerAndModal} style={styles.iconView}>
          <Icon
            name={
              I18nManager.isRTL
                ? 'chevron-forward-outline'
                : 'chevron-back-outline'
            }
            size={26}
            color={colors.black}
          />
        </TouchableOpacity>
        <Image source={Images.wafaLogo} style={styles.headerLogo} />
      </View>
    );
  };

  return (
    <Modal
      visible={isOpen}
      animationType={'slide'}
      style={styles.container}
      onRequestClose={() => {
        setIsOpen(false);
      }}>
      <SafeAreaView style={styles.container}>
        <Header />
        <View style={styles.webPageView}>
          {item && <WebView startInLoadingState={true} source={{uri: item}} />}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default WebDisplay;
