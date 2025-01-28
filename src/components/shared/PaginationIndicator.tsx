import React, {useEffect, useRef} from 'react';
import {View, Animated, StyleSheet} from 'react-native';

export interface PaginationIndicatorProps {
  currentIndex: number; // 현재 페이지 인덱스
  totalSteps: number; // 전체 페이지 수
}

const PaginationIndicator: React.FC<PaginationIndicatorProps> = ({
  currentIndex,
  totalSteps,
}) => {
  const animatedIndex = useRef(new Animated.Value(currentIndex)).current;

  useEffect(() => {
    // currentIndex가 변경될 때 애니메이션 실행
    Animated.timing(animatedIndex, {
      toValue: currentIndex, // 목표 인덱스로 애니메이션
      duration: 300, // 애니메이션 지속 시간 (0.3초)
      useNativeDriver: false, // width는 네이티브 드라이버 사용 불가
    }).start();
  }, [currentIndex]);

  return (
    <View style={styles.pagination}>
      {[...Array(totalSteps)].map((_, index) => {
        const widthAnimation = animatedIndex.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [8, 25, 8], // 현재 페이지는 길게, 나머지는 짧게
          extrapolate: 'clamp',
        });

        const opacityAnimation = animatedIndex.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [0.24, 1, 0.24], // 현재 페이지는 진하게, 나머지는 흐리게
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.bullet,
              {
                width: widthAnimation,
                opacity: opacityAnimation,
              },
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bullet: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#C25E3A', // 불렛 색상
    marginHorizontal: 3,
  },
});

export default PaginationIndicator;
