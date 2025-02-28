import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, StatusBar, Animated} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomText from '../components/shared/CustomText';

import Logo from '../assets/icons/logo.svg';
import Character from '../assets/icons/character_close_eye.svg';

const SplashScreen = (): React.JSX.Element => {
  const animationValue = useRef(new Animated.Value(-550)).current;
  const logoScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // 애니메이션 실행
    Animated.parallel([
      Animated.timing(animationValue, {
        toValue: -430, // 캐릭터 최종 위치
        duration: 1200, // 지속 시간
        useNativeDriver: false,
      }),
      Animated.timing(logoScale, {
        toValue: 0.6,
        duration: 1200,
        useNativeDriver: false,
      }),
    ]).start();
  }, [animationValue, logoScale]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="#f9ebe4"
        barStyle="dark-content"
      />
      <View style={styles.content}>
        <Animated.View style={{transform: [{scale: logoScale}]}}>
          <Logo width={200} height={40} />
        </Animated.View>
        <CustomText
          weight="Bold"
          style={{fontSize: 20, marginTop: 8, color: '#565656'}}>
          퀴즈로 맞추는, 기억의 조각
        </CustomText>
      </View>
      <Animated.View
        style={[
          styles.characterContainer,
          {bottom: animationValue}, // 애니메이션 값을 바텀 위치에 적용
        ]}>
        <Character width={768} height={768} />
      </Animated.View>
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
    marginTop: 280,
  },
  characterContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    overflow: 'hidden',
  },
});

export default SplashScreen;
