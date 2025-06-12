import {
  FlatList,
  SafeAreaView,
  Text,
  View,
  Image,
  Alert,
} from 'react-native';
import { useEffect, useState } from 'react';
import createStyle from '@home/History/Styles';
import { useTranslation } from 'react-i18next';
import Loader from '@components/molecule/Loader/Loader';
import { Images } from '@assets/icons';
import { HistoryItem } from '@network/soap/Interface';
import { getTransactionDetails } from '@services/utils/LocalStore/TransactionStore';
import moment from 'moment';
import { STORE_LIST } from '@constants/Contants';

const History = () => {
  const styles = createStyle();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [saleData, setSaleData] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [isAlert, setIsAlert] = useState<boolean>(false);
  const { t } = useTranslation();
  
  useEffect(() => {
    getTransactionHistoryPoints();
  }, []);

  useEffect(() => {
    if (error && !isLoading && !isAlert) {
      Alert.alert('myWafa', error, [{ text: 'OK', onPress: () => setIsAlert(true) }]);
    }
  }, [error, isLoading, isAlert]);

  const getTransactionHistoryPoints = async () => {
    
    setLoading(true)
    const details: string | null = await getTransactionDetails();

    if (details) {
      const parsedData = JSON.parse(details)
      const salesdata = parsedData.Data.filter((item: any) => item["Entry Type"] === "Sales")
      setSaleData(salesdata);
    }

    setLoading(false)
  }

  const transactionTitle = (item: HistoryItem) => {
    if (item['Gross Amount'] >= 0 ) 
     return t('common:return');
    else if (item['Gross Amount'] < 0) 
     return t('common:purchase'); 
  }

  const grossAmtChange = (item : number) => {
    const positiveGrossAmount = Math.abs(Number(item));
    return positiveGrossAmount.toLocaleString() + ' ' + 'AED';
  }

  // eslint-disable-next-line react/no-unstable-nested-components
  const TransactionItem = ({ item }: { item: HistoryItem }) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.textContainer}>
          <Image source={Images.appIcon2} resizeMode="contain" style={styles.logo} />
          <View>
            <Text style={styles.title}>{transactionTitle(item)}</Text>
            <Text style={styles.date}>{moment(item?.Date).format("DD MMM YYYY")}</Text>
            <Text style={styles.subtitle}>{t('common:orderId')}: {item['Order Id']}</Text>
            <Text style={styles.subtitle}>{t('common:grossAmt')}: {grossAmtChange(item['Gross Amount'])}</Text>
            <Text style={styles.subtitle}>{STORE_LIST.find(store => store.sap_store_code === item['Store Code'])?.store_name}</Text>
          </View>
        </View>
      </View>
    )
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.subContainer}>
          <Text style={styles.headingText}>{t('common:history')}</Text>
        </View>
        {!isLoading && (
          <View style={styles.flatListView}>
          <FlatList data={saleData} renderItem={TransactionItem} />
          </View>
        )}
        {error && !isLoading && isAlert && (
          <View style={styles.errorView}>
            <Text style={styles.errorText}>{t('common:noRecords')}</Text>
          </View>
        )}
      </View>
      {isLoading && <Loader />}
    </SafeAreaView>
  );
};

export default History;
