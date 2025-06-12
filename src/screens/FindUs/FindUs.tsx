import {View, SafeAreaView} from 'react-native';
import React from 'react';
import {createStyle} from './Styles';
import { MyWebView } from '@components/organisms/MyWebView/myWebView';
import { useEncryptedConfig } from '@services/utils/LocalStore/ConfigeStore';

const FindUs = () => {
  const { configData } = useEncryptedConfig();
  const link = configData?.storelocator;
  const styles = createStyle();
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.webPageView}>
       {link && <MyWebView link={link}/>}
      </View>
    </SafeAreaView>
  );
};

export default FindUs;
