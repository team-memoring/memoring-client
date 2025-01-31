import React, {useRef} from 'react';
import {TextInput, View, StyleSheet} from 'react-native';

interface CodeInputProps {
  code: string[];
  setCode: (code: string[]) => void;
  codeLength?: number;
  isError?: boolean;
}

const CodeInput = ({
  code,
  setCode,
  codeLength = 6,
  isError = false,
}: CodeInputProps) => {
  const inputs = useRef<TextInput[]>([]);

  const handleChange = (text: string, index: number) => {
    if (text.length > 1) return; // 한 글자 이상 입력 방지
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < codeLength - 1) {
      inputs.current[index + 1]?.focus(); // 다음 입력칸으로 이동
    }
  };

  const handleBackspace = (index: number) => {
    if (index > 0 && !code[index]) {
      inputs.current[index - 1]?.focus(); // 이전 입력칸으로 이동
    }
  };

  return (
    <View style={styles.container}>
      {code.map((digit, index) => (
        <TextInput
          key={index}
          ref={el => (inputs.current[index] = el!)}
          style={[
            styles.input,
            isError && {borderColor: '#CE5419'},
            index === 0 && {marginLeft: 0},
            index === codeLength - 1 && {marginRight: 0},
          ]}
          keyboardType="number-pad"
          maxLength={1}
          value={digit}
          onChangeText={text => handleChange(text, index)}
          onKeyPress={({nativeEvent}) => {
            if (nativeEvent.key === 'Backspace') {
              handleBackspace(index);
            }
          }}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 36,
    width: '100%',
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 32,
    color: '#222225',
    backgroundColor: '#fff',
    fontFamily: 'NanumSquareRoundEB',
    paddingVertical: 20,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#fff',
  },
});

export default CodeInput;
