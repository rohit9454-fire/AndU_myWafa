import {
  View,
  Text,
  FlatList,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  Image,
  I18nManager,
  BackHandler,
} from 'react-native';
import React, { FC, useCallback, useEffect, useState } from 'react';
import createStyle from '@home/Rewards/Styles';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import Loader from '@components/molecule/Loader/Loader';
import { PointsData } from '@network/soap/Interface';
import Icon from 'react-native-vector-icons/Ionicons';
import { Images } from '@assets/icons';
import { colors } from '@assets/colors';
import { getTransactionDetails } from '@services/utils/LocalStore/TransactionStore';
import { STORE_LIST } from '@constants/Contants';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '@navigation/navigationType';

export interface RewardProps {
  isOpen: boolean;
  setRewardOpen: (val: boolean) => void;
  setActiveTab: (val: string) => void;
  preActiveTab: string;
}

const Rewards: FC<RewardProps> = ({ isOpen, setRewardOpen, setActiveTab, preActiveTab }) => {
  const styles = createStyle();
  const { t } = useTranslation();
  const langTabs = ['all', 'earned', 'used'];
  const [activeLocalTab, setActiveLocalTab] = useState<string>('all');
  const [isLoading, setLoading] = useState<boolean>(false);
  const [pointsList, setPointsList] = useState<PointsData[] | null>();
  const [earnedPointsList, setEarnedPointsList] = useState<PointsData[] | null>();
  const [usedPointsList, setUsedPointsList] = useState<PointsData[] | null>();
  const [errorMsg, setErrorMsg] = useState<string>('');
  const isModal = false;

  useEffect(() => {
    getPointsLedger();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (isOpen) {
          console.log("Back button pressed, closing modal...");
          setRewardOpen(false);
          setActiveTab(preActiveTab !== '' ? preActiveTab : 'myAccount');
          return true; // prevent default behavior (exit app)
        }
        return false; // default behavior (do nothing if modal is closed)
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [isOpen, preActiveTab, setRewardOpen, setActiveTab])
  );

  const getPointsLedger = async () => {
    setLoading(true)
    const details = await getTransactionDetails();
    if (details) {
      const data = JSON.parse(details).Data

      // All Points
      setPointsList(data);

      // Earned Ponits
      const saleEntryType = data.filter((entry: PointsData) => entry['Entry Type'] === "Sales");
      const salesPoints = saleEntryType.filter((entry: PointsData) => entry['Gross Amount'] < 0);
      const positiveAdjmtEntryType = data.filter((entry: PointsData) => entry['Entry Type'] === "Positive Adjmt.");
      const positiveAdmtPoints = positiveAdjmtEntryType.filter((entry: PointsData) => entry.Points)
      const finalEarned = [...salesPoints, ...positiveAdmtPoints];
      setEarnedPointsList(finalEarned);

      // Used or Redeem Points
      const redemptionEntryType = data.filter((entry: PointsData) => entry['Entry Type'] === "Redemption");
      const redemptionPoints = redemptionEntryType.filter((entry: PointsData) => entry.Points);
      setUsedPointsList(redemptionPoints);

      setLoading(false)
    }
  };

  const titleText = (item: PointsData) => {
    let title;
    if (item?.['Entry Type'] === 'Positive Adjmt.') {
      title = t('common:positiveAdjustment')
    } else if (item?.['Entry Type'] === 'Negative Adjmt.') {
      title = t('common:negativeAdjustments')
    } else if (item?.['Entry Type'] === 'Redemption') {
      title = t('common:redemption')
    } else if (item?.['Entry Type'] === 'Sales') {
      if (item?.['Gross Amount'] < 0) {
        title = t('common:positiveAdjustment')
      } else if (item?.['Gross Amount'] >= 0) {
        title = t('common:returnRewards')
      }
    }
    return title;
  }

  // eslint-disable-next-line react/no-unstable-nested-components
  const RenderItem = ({ item }: { item: PointsData }) => {
    return (
      <View style={styles.renderContainer}>
        <Image source={Images.appIcon2} resizeMode="contain" style={styles.logo} />
        <View style={styles.titleView}>
          <View style={{ width: 200 }}>
            <Text style={styles.titleText}>{titleText(item)}</Text>
            <Text style={styles.dateText}>{moment(item?.Date).format("DD MMM YYYY")}</Text>
            <Text style={styles.dateText}>{t('common:orderId')} : {item?.['Order Id']}</Text>
            <Text style={styles.dateText}>{STORE_LIST.find(store => store.sap_store_code === item['Store Code'])?.store_name}</Text>
          </View>
          {(item?.['Gross Amount'] >= 0 && item?.['Entry Type'] === 'Sales') && <Text style={[styles.textView, { color: colors.red }]}>{`-${(Number(item?.Points) * 0.01).toFixed(2)}`}{` ${t('common:worth_aed')}`}</Text>}
          {!(item?.['Gross Amount'] >= 0 && item?.['Entry Type'] === 'Sales') && <Text style={[styles.textView, { color: item?.Points.toString().startsWith('-') ? colors.red : colors.green }]}>{item?.Points.toString().startsWith('-') ? `${(Number(item?.Points) * 0.01).toFixed(2)}` : `+${(Number(item?.Points) * 0.01).toFixed(2)}`}{` ${t('common:worth_aed')}`}</Text>}
        </View>
      </View>
    );
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const Header = () => {
    return (
      <View style={styles.headerView}>
        <TouchableOpacity
          onPress={() => {
            setRewardOpen(false);
            setActiveTab(preActiveTab !== '' ? preActiveTab : 'myAccount');
          }}
          style={styles.iconView}>
          <Icon
            name={
              I18nManager.isRTL
                ? 'chevron-forward-outline'
                : 'chevron-back-outline'
            }
            size={26}
            color={colors.primaryDark}
          />
        </TouchableOpacity>
        <Image source={Images.wafaLogo} style={styles.headerLogo} />
      </View>
    );
  };

  const ModalHeader = () => {
    return (
      <View style={styles.modalHeaderView}>
        <Image source={Images.wafaLogo} style={styles.headerLogo} />
        <TouchableOpacity
          onPress={() => {
            setRewardOpen(false);
            setActiveTab(preActiveTab !== '' ? preActiveTab : 'myAccount');
          }}
          style={styles.iconView}>
          <Icon name={'close'} color={colors.primaryDark} size={26}/>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <Modal animationType="slide" transparent={false} visible={isOpen}>
        <SafeAreaView style={styles.container}>
          {isModal ? <Header /> : <ModalHeader />}
          <View style={styles.tabContainer}>
            {langTabs.map(tab => (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.tabItem,
                  activeLocalTab === tab && styles.activeTabItem,
                ]}
                onPress={() => setActiveLocalTab(tab)}>
                <Text style={[styles.tabText, { color: activeLocalTab === tab ? colors.primaryDark : colors.black }]}>{t(`common:${tab}`)}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.subContainer}>
            {errorMsg && !isLoading && (
              <Text style={styles.headingText}>{errorMsg}</Text>
            )}

            {!isLoading && (
              <View style={styles.subListView}>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  data={activeLocalTab === 'all' ? pointsList : activeLocalTab === 'earned' ? earnedPointsList : activeLocalTab === 'used' ? usedPointsList : pointsList}
                  renderItem={RenderItem}
                />
              </View>
            )}

            {isLoading && <Loader />}
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default Rewards;
