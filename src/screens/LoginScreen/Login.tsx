/* eslint-disable no-undef */
import {
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  Alert,
  Modal,
} from 'react-native';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Button } from '@components/atoms/Button/Button';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '@navigation/navigationType';
import createStyle from './styles';
import Input from '@components/atoms/TextInput/Input';
import { Images } from '@assets/icons';
import { getResponseResult } from '@network/soap/SoapService';
import { setUserData } from '@services/utils/LocalStore/UserDetailsStore';
import Loader from '@components/molecule/Loader/Loader';
import { getMMCardService } from '@network/soap/SoapMMService';
import { colors } from '@assets/colors';
import { MyWebView } from '@components/organisms/MyWebView/myWebView';
import { initializeFirebase, triggerCrash } from '@services/utils/firebase';
import { useEncryptedConfig } from '@services/utils/LocalStore/ConfigeStore';
import AlertView from '@components/atoms/CustomAlert/AlertView';
import { getAllowNavigationReset } from '@navigation/NavigationGuard';
const { width } = Dimensions.get('screen');
const Login = () => {
  const styles = createStyle();
  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const [mobile, setMobile] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [TACOpen, setTACOpen] = useState<boolean>(false);
  const { configData } = useEncryptedConfig();
  const link = configData?.about;

  useEffect(() => {
    initializeFirebase();
  }, []);

  useEffect(() => {
    const unsbscribe = navigation.addListener('beforeRemove', e => {
      if (getAllowNavigationReset()) return; // allow - the default behavior of back button
      e.preventDefault(); // to stop default behavior of android hardware back button
    })
    return unsbscribe;
  }, [navigation])

  // eslint-disable-next-line react/no-unstable-nested-components
  const TextLinkView = ({
    title,
    onClick,
    linkText,
    customStyle,
  }: {
    title: string;
    onClick: () => void;
    linkText: string;
    customStyle?: StyleMedia;
  }) => {
    return (
      <View style={styles.registerView}>
        <Text style={[styles.checkboxText, customStyle]}>{title}</Text>
        <TouchableOpacity onPress={() => onClick()}>
          <Text style={[styles.registerText, customStyle]}>{linkText}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const handleSignIn = async () => {
    const phoneRegex = /^5\d{8}$/;
    if (!phoneRegex.test(mobile)) {
      Alert.alert(t('common:andYou'), t('common:invalidPhone'));
      return;
    }
    const cardDetails = {
      mMCard: mobile,
      loyType: 0,
      getBalanceOnlyFlag: false,
      currCode: 'AED',
      countryCode: '971',
      firstName: '',
      lastName: '',
    };

    setIsLoading(true);
    const res = await getMMCardService(cardDetails);
    const result = await getResponseResult(res);

    // New User
    if (result && result?.errorCode === '9012') {
      setIsLoading(false);
      Alert.alert(t('common:andYou'), t('common:userNotFound'));
    }

    // Registered User
    if (result && result?.IsSuccess === "true") {
      setIsLoading(false);
      setUserData(JSON.stringify(result));
      navigation.navigate('Otp', { fromScreen: 'Login' });
    }
    setMobile('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.headerView}>
          <Text style={styles.headerText}>{t('common:signIn')}</Text>
        </View>
        <View style={styles.loginInputs}>
          <View style={styles.logo}>
            <Image
              source={Images.wafaLogo}
              style={styles.logoUI}
              resizeMode='contain' />
          </View>
          <Input
            customStyle={styles.input}
            placeHolder={t('common:mobileNum')}
            setVal={setMobile}
            maxLength={9}
            keyboardType={'number-pad'}
            val={mobile}
            inputWidth={width * 0.675}
            iconName={'person-circle-outline'}
          />
        </View>
        <View style={styles.rememberView}>
          <Button
            customStyle={styles.btnStyle}
            onPress={handleSignIn}
            title={t('common:signIn')}
          />
        </View>
        <View style={styles.bottomView}>
          <TextLinkView
            title={t('common:notHaveAccount')}
            // onClick={() => triggerCrash()}
            onClick={() => navigation.navigate('Register')}
            linkText={t('common:signUp')}
          />
        </View>
        <View style={styles.footerView}>
          <TextLinkView
            customStyle={styles.footerText}
            title={t('common:SignUpTC')}
            onClick={() => setTACOpen(true)}
            linkText={t('common:TnC')}
          />
          <Text style={styles.mywafaC}>{t('common:myWafaC')}</Text>
        </View>
        {isLoading && <Loader />}

        {/* T&C HyperLink  */}
        <Modal transparent={false} animationType={'slide'} visible={TACOpen}>
          <SafeAreaView style={styles.webPageView}>
            <TouchableOpacity style={styles.closeBtn} activeOpacity={0.8} onPress={() => setTACOpen(false)}>
              <Icon name={'close'} color={colors.black} size={30} />
            </TouchableOpacity>
            {link && <MyWebView link={link} />}
          </SafeAreaView>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
