import {Text, SafeAreaView, View, FlatList, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import createStyle from '@home/MyPoints/Styles';
import {getUserData} from '@services/utils/LocalStore/UserDetailsStore';
import Loader from '@components/molecule/Loader/Loader';
import {
  getPointsHistoryService,
  getResponseResult,
} from '@network/soap/SoapService';
import {MyPointsProps} from '@network/soap/Interface';
import {
  // KeyValueConvertor,
  parseMalformedJSON,
} from '@network/soap/genaricFuntions';
import {useTranslation} from 'react-i18next';
 
const MyPoints = () => {
  const styles = createStyle();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [displayData, setDisplayData] = useState<
    MyPointsProps[] | null | undefined
  >();
  const {t} = useTranslation();
 
  useEffect(() => {
    getPointsHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 
  const getPointsHistory = async () => {
    const userData = await getUserData();
    setLoading(true);
    if (userData) {
      try {
        const response = await getPointsHistoryService(
          JSON.parse(userData)?.memberphone
        );
        const result = await getResponseResult(response);
        if (typeof result === 'string') {
          const data = parseMalformedJSON(result);
          const conData = [data];
          setDisplayData(conData);
          setLoading(false);
        }
      } catch (error: any) {
        setLoading(false);
        Alert.alert(t('common:andYou'), error);
      }
    }
  };
 
  // eslint-disable-next-line react/no-unstable-nested-components
  const RenderItem = ({item}: {item: MyPointsProps}) => {
    return (
      <View style={styles.renderContainer}>
        <View style={styles.textStyle}>
          <Text style={styles.textView}>{t('common:accountNo')}:</Text>
          <Text style={styles.ammountTextView}>{item?.AccountNo}</Text>
        </View>
        <View style={styles.textStyle}>
          <Text style={styles.textView}>
            {t('common:totalPointsAvailable')}:
          </Text>
          <Text style={styles.ammountTextView}>
            {item?.['Total points available']}
          </Text>
        </View>
        <View style={styles.textStyle}>
          <Text style={styles.textView}>{t('common:totalPointsEarned')}:</Text>
          <Text style={styles.ammountTextView}>{item?.['Total points earned']}</Text>
        </View>
        <View style={styles.textStyle}>
          <Text style={styles.textView}>
            {t('common:totalPointsRedeemed')}:
          </Text>
          <Text style={styles.ammountTextView}>{item?.['total points redeemed']}</Text>
        </View>
      </View>
    );
  };
 
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.headingText}>{t('common:myPoints')}</Text>
        {!isLoading && <FlatList data={displayData} renderItem={RenderItem} />}
      </View>
      {isLoading && <Loader />}
    </SafeAreaView>
  );
};
 
export default MyPoints;