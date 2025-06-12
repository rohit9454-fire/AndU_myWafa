import {Image, SafeAreaView, Text, View} from 'react-native';
import createStyle from './styles';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from '@navigation/navigationType';
import {useTranslation} from 'react-i18next';
import {Button} from '@components/atoms/Button/Button';
import {LanguageToggleButton} from '@components/molecule/LanguageToggle/LanguageToggle';
import {Images} from '@assets/icons';
import {setLanguage} from '@services/utils/LocalStore/LanguageStore';

const LanguageSelectionScreen = () => {
  const style = createStyle();
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const {t} = useTranslation();
  const handleClick = () => {
    setLanguage(true);
    navigation.navigate('Main');
  };
  return (
    <SafeAreaView style={style.mainContainer}>
      <Image source={Images.wafaLogo} style={style.logo} resizeMode={'contain'}/>
      <View style={style.logoView} />
      <View style={style.container}>
        <Text style={style.headingEng}>{t('common:pleaseSelectAr')}</Text>
        <Text style={style.headingEng}>{t('common:pleaseSelect_lang')}</Text>
      </View>
      <LanguageToggleButton />
      <Button onPress={handleClick} title={t('common:next')} />
    </SafeAreaView>
  );
};

export default LanguageSelectionScreen;
