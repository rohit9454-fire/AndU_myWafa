import React, {FC} from 'react';
import {Picker} from '@react-native-picker/picker';
import {
  Modal,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import createStyle from '@components/atoms/DropDownPicker/Styles';
import {colors} from '@assets/colors';
import Icon from 'react-native-vector-icons/Ionicons';
export interface DorpDownItem {
  label: string;
  value: string;
}
interface DropDownProps {
  data: DorpDownItem[];
  isOpen: boolean;
  val: string | undefined;
  toggleDropdown: () => void;
  setVal: (val: string | undefined) => void;
  // eslint-disable-next-line no-undef
  customStyle?: StyleMedia;
}

export const Dropdown: FC<DropDownProps> = ({
  data,
  isOpen,
  setVal,
  val,
  customStyle,
  toggleDropdown,
}) => {
  const styles = createStyle();
  return (
    <View style={[styles.container, customStyle]}>
      <TouchableWithoutFeedback onPress={toggleDropdown}>
        <View style={[styles.dropdownHeader, customStyle]}>
          <Text style={styles.selectedValue}>
            {data.find(item => item.value === val)?.label || 'Select'}
          </Text>
          <Icon name={'caret-down-outline'} size={16} color={colors.black} />
        </View>
      </TouchableWithoutFeedback>
      <Modal
        transparent={true}
        visible={isOpen}
        animationType={'slide'}
        onRequestClose={() => toggleDropdown}>
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalSubView}>
            <TouchableOpacity style={styles.closeIcon} onPress={toggleDropdown}>
              <Icon name={'close'} size={26} color={colors.black} />
            </TouchableOpacity>
            <Picker
              mode="dropdown"
              selectedValue={val}
              onValueChange={itemValue => {
                setVal(itemValue);
                toggleDropdown();
              }}>
              {data.map(item => (
                <Picker.Item
                  style={styles.pickerTitle}
                  key={item.label}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </Picker>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export const AndroidDropDown: FC<DropDownProps> = ({
  data,
  setVal,
  val,
  toggleDropdown,
  customStyle,
}) => {
  const styles = createStyle();
  return (
    <View style={[styles.androidContainer, customStyle]}>
      <Picker
        mode="dropdown"
        selectedValue={val}
        onValueChange={itemValue => {
          setVal(itemValue);
          toggleDropdown();
        }}>
        {data.map(item => (
          <Picker.Item
            key={item.label}
            color={colors.primaryDark}
            style={styles.pickerTitle}
            label={item.label}
            value={item.value}
          />
        ))}
      </Picker>
    </View>
  );
};
