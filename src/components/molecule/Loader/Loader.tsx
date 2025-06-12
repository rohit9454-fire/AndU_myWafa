import React, {FC} from 'react';
import {View, ActivityIndicator} from 'react-native';
import createStyle from './Style';
import {colors} from '@assets/colors';

const Loader: FC<any> = () => {
  const styles = createStyle();

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.black} />
    </View>
  );
};

export default Loader;
