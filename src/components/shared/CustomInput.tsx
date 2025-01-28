import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInputProps,
} from 'react-native';

import Xmark from '../../assets/icons/xmark.svg';

interface CustomInputProps extends TextInputProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  maxLength?: number;
  error?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  placeholder,
  value,
  onChangeText,
  maxLength,
  error = false,
}) => {
  return (
    <View style={[styles.inputContainer, error && styles.errorBorder]}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#C5C5C7"
        value={value}
        onChangeText={onChangeText}
        maxLength={maxLength ?? undefined}
      />

      {value.length > 0 && (
        <TouchableOpacity
          onPress={() => onChangeText('')}
          style={styles.clearButton}>
          <Xmark width={16} height={16} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    paddingHorizontal: 24,
    height: 68,
    width: '100%',
  },
  input: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'NanumGothicBold',
    color: '#222225',
  },
  clearButton: {
    padding: 4,
    backgroundColor: '#E9E9EC',
    borderRadius: 25,
  },
  clearText: {
    fontSize: 14,
    color: '#999',
  },
  errorBorder: {
    borderWidth: 1,
    borderColor: '#CE5419',
  },
});

export default CustomInput;
