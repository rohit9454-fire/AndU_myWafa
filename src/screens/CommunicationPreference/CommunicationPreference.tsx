import { View, SafeAreaView, Text, TouchableOpacity, I18nManager } from 'react-native';
import createStyle from './Styles';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { Button } from '@components/atoms/Button/Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '@navigation/navigationType';
import { channels, PC_SUBMIT_CONSENT, channelsAr } from '@constants/Contants';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '@assets/colors';
import { PC_SUBMIT_CONSENT_HEADER, postAPIClient } from '@network/APICall/APIClient';
import { useEncryptedConfig } from '@services/utils/LocalStore/ConfigeStore';
import NavToolBar from '@components/molecule/NavToolBar/NavToolBar';
import { useFetchPrefComm } from '@network/APICall/PrefCommHook';
import Loader from '@components/molecule/Loader/Loader';

const CommunicationPreference = () => {

    const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
    const styles = createStyle();
    const [selectedOption, setSelectedOption] = useState<'accept' | 'decline'>('decline');
    const [selected, setSelected] = useState<string[]>([]);
    const { configData } = useEncryptedConfig();

    const { data } = useFetchPrefComm();

    const consentJson = (purpose: any) => {
        return {
            dsDataElements: {
                Source: "iOS",
                Name: "Nimit Bagadiya",
                Email: "nimit.bagadiya+consent1@brainvire.com",
                Brand: "SSS",
                "WhatsApp Number": "",
                Mobile: ""
            },
            identifier: "001UE00000GRJJxYAP",
            purposes: purpose,
            requestInformation: configData?.onetrust_consent_info?.requestInformation
        }
    };

    useEffect(() => {
        if (data) {
            setSelectedOption('accept');
        } else {
            setSelectedOption('decline');
        }
        const presetChannels = data?.purposes.find((pur: any) =>
            pur.id === configData.onetrust_consent_info.purpose_ID).customPreferences.find((pref: any) =>
                pref.id === configData.onetrust_consent_info.custom_preference_ID)?.options || [];

        const selectedChannelNames = presetChannels.map((option: any) => option.name);

        setSelected(selectedChannelNames);
    }, [data]);

    const toggleCheckbox = (label: string) => {
        if (label === t('common:selectAllChannels')) {
            if (selected.length === channels.length - 1) {
                setSelected([]); // deselect all
            } else {
                setSelected(channels.filter(ch => ch !== t('common:selectAllChannels')));
            }
        } else {
            const newSelected = selected.includes(label)
                ? selected.filter(item => item !== label)
                : [...selected, label];
            setSelected(newSelected);
        }
    };

    const renderCheckbox = (label: string) => {
        const isChecked =
            label === 'Select All Channels'
                ? selected.length === channels.length - 1
                : selected.includes(label);

        return (
            <TouchableOpacity
                key={label}
                style={styles.checkboxContainer}
                onPress={() => toggleCheckbox(label)}
            >
                <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
                    {isChecked &&
                        <Icon
                            name='checkmark-sharp'
                            size={16}
                            color={colors.white}
                        />}
                </View>
                <Text style={styles.checkboxLabel}>{label}</Text>
            </TouchableOpacity>
        );
    };

    const submitPreferences = async () => {
        const selectedOption = configData?.onetrust_consent_info?.consentOptions.filter((option: any) => selected.includes(option.name)).map((item: any) => item?.consentId);
        const resultPurposes = {
            purposes: [
                {
                    TransactionType: "CONFIRMED",
                    Id: configData?.onetrust_consent_info?.purpose_ID,
                    CustomPreferences: [
                        {
                            Options: selectedOption,
                            Id: configData?.onetrust_consent_info?.custom_preference_ID
                        }
                    ]
                }
            ],
        };

        const submitResponse: any = await postAPIClient(PC_SUBMIT_CONSENT, consentJson(resultPurposes.purposes), PC_SUBMIT_CONSENT_HEADER);

        if (submitResponse?.receipt) {
            navigation.navigate('Drawer');
        }
    }

    // if (!data) return <Loader />;

    return (
        <SafeAreaView style={styles.container}>
            <NavToolBar title={t('common:communicationPreference')} />
           {data ? 
           <View style={styles.subContainer}>
                <Text style={styles.text}>{t('common:communicationPreferenceContent')}</Text>
                <View style={styles.seprator} />
                    <View style={styles.radioContainer}>
                        <TouchableOpacity
                            style={styles.radioItem}
                            onPress={() => setSelectedOption('accept')}>
                            <View style={styles.radioOuterCircle}>
                                {selectedOption === 'accept' && <View style={styles.radioInnerCircle} />}
                            </View>
                            <Text style={styles.radioLabel}>{t('common:accept')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.radioItem}
                            onPress={() => setSelectedOption('decline')}>
                            <View style={styles.radioOuterCircle}>
                                {selectedOption === 'decline' && <View style={styles.radioInnerCircle} />}
                            </View>
                            <Text style={styles.radioLabel}>{t('common:notAccept')}</Text>
                        </TouchableOpacity>
                    </View>
                    {selectedOption === 'accept' && <View>
                        <Text style={styles.preferredChannelText}>{t('common:selectChannel')}</Text>
                        <View style={styles.checkboxGrid}>
                            {I18nManager.isRTL ? channelsAr.map(renderCheckbox) : channels.map(renderCheckbox)}
                        </View>
                    </View>}
                    <Button
                        title={t('common:saveSmall')}
                        onPress={submitPreferences}
                        customStyle={styles.buttonStyle}
                        titleStyle={styles.titleStyle}
                    />
            </View> : <Loader/>}
        </SafeAreaView>
    );
};

export default CommunicationPreference;
