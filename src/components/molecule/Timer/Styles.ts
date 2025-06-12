import { colors } from '@assets/colors';
import { fonts } from '@assets/fonts';
import { StyleSheet } from 'react-native';

const createStyle = () =>
    StyleSheet.create({
        container: {
            justifyContent: 'center',
            alignItems:'flex-start',
        },
        timerText: {
            fontSize: 28,
            color: colors.black,
            fontFamily:fonts.regular
        },
    });
export default createStyle;
