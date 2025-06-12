import { FC } from 'react';
import { OtpInput } from "react-native-otp-entry";
import createStyle from './Style';
import { colors } from '@assets/colors';

interface OtpComponentProps {
  handleInputChange: (text: string) => void;
}

const OtpComponent: FC<OtpComponentProps> = ({handleInputChange}) => {
  const styles = createStyle();

  return (
      <OtpInput
        numberOfDigits={4}
        focusColor={colors.primaryDark}
        autoFocus={true}
        hideStick={false}
        blurOnFilled={true}
        disabled={false}
        type="numeric"
        secureTextEntry={false}
        focusStickBlinkingDuration={500}
        onTextChange={(text) => handleInputChange(text)}
        onFilled={(text) => console.log(`OTP is ${text}`)}
        textInputProps={{
          accessibilityLabel: "One-Time Password",
        }}
        theme={{
          containerStyle: styles.container,
          pinCodeContainerStyle: styles.pinCodeContainer,
          pinCodeTextStyle: styles.pinCodeTextStyle
        }}
      />
  );
};

export default OtpComponent;
