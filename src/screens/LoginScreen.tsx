import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, StatusBar, Animated, Button} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomText from '../components/shared/CustomText';

import Logo from '../assets/icons/logo.svg';
import Character from '../assets/icons/character.svg';
import Kakao from '../assets/icons/kakao.svg';

const LoginScreen = (): React.JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="#f9ebe4"
        barStyle="dark-content"
      />
      <View style={styles.content}>
        <View>
          <Logo width={120} height={24} />
        </View>
        <CustomText
          weight="Bold"
          style={{fontSize: 28, marginTop: 8, color: '#222225'}}>
          반갑습니다,
        </CustomText>
        <CustomText weight="Bold" style={{fontSize: 28, color: '#222225'}}>
          함께 추억으로 떠나봐요!
        </CustomText>
      </View>
      <View style={[styles.characterContainer]}>
        <Character width={768} height={768} />
      </View>
      <View style={styles.centerContainer}>
        <View style={styles.kakaoLoginButton}>
          <Kakao width={24} height={24} />
          <CustomText
            weight="ExtraBold"
            style={{fontSize: 18, color: '#fff', marginLeft: 8}}>
            카카오로 로그인
          </CustomText>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9ebe4',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    marginTop: 160,
  },
  characterContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -430,
    alignItems: 'center',
    overflow: 'hidden',
  },
  centerContainer: {
    position: 'absolute',
    bottom: 36,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  kakaoLoginButton: {
    width: 360,
    height: 52,
    backgroundColor: '#222225',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default LoginScreen;
