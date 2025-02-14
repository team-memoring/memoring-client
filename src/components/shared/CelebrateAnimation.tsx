import React, {useEffect, useRef} from 'react';
import {Animated, Dimensions, Image, StyleSheet, View} from 'react-native';

const {height} = Dimensions.get('window'); // 화면 높이 가져오기
const FALL_DURATION = 6000; // 배경이 내려가는 속도 (ms)
const DELAY = 2200; // 두 번째 이미지가 떨어지는 딜레이 시간 (ms)

const CelebrateAnimation = () => {
  const translateY1 = useRef(new Animated.Value(-height)).current;
  const translateY2 = useRef(new Animated.Value(-height)).current;

  useEffect(() => {
    // 첫 번째 이미지 애니메이션
    Animated.timing(translateY1, {
      toValue: height,
      duration: FALL_DURATION,
      useNativeDriver: true,
    }).start();

    // 두 번째 이미지가 DELAY 후 시작
    setTimeout(() => {
      Animated.timing(translateY2, {
        toValue: height,
        duration: FALL_DURATION,
        useNativeDriver: true,
      }).start();
    }, DELAY);
  }, []);

  return (
    <View style={StyleSheet.absoluteFill}>
      {/* 첫 번째 이미지 */}
      <Animated.Image
        source={require('../../assets/graphics/celebrate.png')}
        style={[
          styles.celebrateBackground,
          {transform: [{translateY: translateY1}]},
        ]}
      />

      {/* 두 번째 이미지 (약간 늦게 시작) */}
      <Animated.Image
        source={require('../../assets/graphics/celebrate.png')}
        style={[
          styles.celebrateBackground,
          {transform: [{translateY: translateY2}]},
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  celebrateBackground: {
    position: 'absolute',
    width: '100%',
    height: height, // 화면 높이만큼 배경 설정
    resizeMode: 'cover',
  },
});

export default CelebrateAnimation;
