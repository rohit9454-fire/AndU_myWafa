import {
  Text,
  SafeAreaView,
  View,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {useEffect, useState} from 'react';
import createStyle from '@home/MyAccount/Styles';
import {Images} from '@assets/icons';
import ActionButton from '@components/atoms/ActionButton/ActionButton';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeNavList} from '@navigation/navigationType';
import {getPointsService, getResponseResult} from '@network/soap/SoapService';
import {getUserData} from '@services/utils/LocalStore/UserDetailsStore';
import Loader from '@components/molecule/Loader/Loader';
import Barcode from '@kichiyaki/react-native-barcode-generator';
import { getAPIClient } from '@network/APICall/APIClient';
import { REST_UAT_URL } from '@constants/Contants';
import { setTransactionDetails } from '@services/utils/LocalStore/TransactionStore';

const MyAccount = () => {
  const styles = createStyle();
  const {t} = useTranslation();
  const [points, setPoints] = useState<string>('');
  const [cardNo, setCardNo] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation<NativeStackNavigationProp<HomeNavList>>();
  
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const userData = await getUserData();
    setLoading(true);
    if (userData) {
      setCardNo(JSON.parse(userData)?.memberCard);
      try {
        const response = await getPointsService(JSON.parse(userData)?.memberphone);
        const result = await getResponseResult(response);
        setLoading(false);
        setPoints(result.Points);

        // Transaction History and Points
          const url = REST_UAT_URL + JSON.parse(userData)?.memberphone;
          const remoteData = await getAPIClient(url);
          setTransactionDetails(JSON.stringify(remoteData))
      } catch (error) {
        setLoading(false);
        console.error('Error fetching data:', error);
      }
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.balanceCard}>
          <View style={styles.balanceTextView}>
            <Text style={styles.balanceTitle}>{t('common:currentBln')}</Text>
            <Text style={styles.aedText}>{`${t('common:worth_aed')} ${(Number(points.replace(/,/g, ''))*0.01).toFixed(2)}`}</Text>
          </View>
          <View style={styles.borderView} />
        </View>
        <ImageBackground
          borderRadius={10}
          source={Images.wafaCard}
          style={styles.cardView}
          resizeMode={'cover'}>
          <View style={styles.barCode}>
            <Barcode
              value={cardNo ? cardNo : 'Test'}
              format="CODE128"
              height={35}
              width={2.7}
            />
          </View>
          <View style={styles.wafaNoText}>
            <Text style={styles.wafaText}>{`${cardNo}`}</Text>
          </View>
        </ImageBackground>
       
        <Text style={styles.profileText}>{t('common:manageProfile')}</Text>
        <ActionButton
          title={t('common:updateProfile')}
          onPress={() => navigation.navigate('ProfileUpdate')}
        />
        <View style={styles.scrollSpace} />
        {isLoading && <Loader />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyAccount;
