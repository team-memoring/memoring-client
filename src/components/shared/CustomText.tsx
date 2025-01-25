import React from 'react';
import {Text, TextProps, StyleSheet} from 'react-native';

interface CustomTextProps extends TextProps {
  weight?: 'Light' | 'Regular' | 'Bold' | 'ExtraBold';
}

const CustomText: React.FC<CustomTextProps> = ({
  children,
  style,
  weight = 'Regular', // 기본 Regular로 설정
  ...props
}) => {
  // weight에 따라 폰트 이름 동적으로 설정
  const fontFamily = `NanumSquareRound${
    weight === 'ExtraBold' ? 'EB' : weight[0]
  }`;

  return (
    <Text style={[styles.baseText, {fontFamily}, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  baseText: {
    fontSize: 16,
    color: '#000',
  },
});

export default CustomText;
