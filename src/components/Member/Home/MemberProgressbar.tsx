import React, {useEffect, useRef, useState} from 'react';
import {View, Animated, StyleSheet} from 'react-native';
import {MEMBER_HOME_DURATION} from '../../../screens/Member/MemberHomeScreen';
import LinearGradient from 'react-native-linear-gradient';

import FaceSad from '../../../assets/icons/face_sad.svg';
import FaceHappy from '../../../assets/icons/face_happy.svg';
import FaceOpenEye from '../../../assets/icons/face_open_eye.svg';
import FaceClosedEye from '../../../assets/icons/face_close_eye.svg';

interface MemberProgressBarProps {
  progress: number;
  height?: number;
}

const MemberProgressBar = ({progress, height = 72}: MemberProgressBarProps) => {
  const [containerWidth, setContainerWidth] = useState(0);

  // 0 ~ 100 범위의 progress 값을 애니메이션하기 위한 Animated.Value
  const animatedProgress = useRef(new Animated.Value(1)).current;

  const renderFace = () => {
    if (progress < 30) {
      return <FaceSad width={60} height={60} />;
    } else if (progress < 70) {
      return <FaceOpenEye width={60} height={60} />;
    } else if (progress < 99) {
      return <FaceClosedEye width={60} height={60} />;
    } else {
      return <FaceHappy width={60} height={60} />;
    }
  };

  // progress가 25 미만이면 배경색 변경
  const progressbarBackgroundColor = progress < 25 ? '#D9D9DC' : '#F0F0F3';

  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: progress,
      duration: MEMBER_HOME_DURATION,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const animatedBarWidth = animatedProgress.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  const offset = progress < 25 ? 0 : -68;

  const animatedFaceLeft = animatedProgress.interpolate({
    inputRange: [0, 100],
    outputRange: [0 + offset, containerWidth + offset],
    extrapolate: 'clamp',
  });

  return (
    <View style={[styles.container, {height}]}>
      <View
        style={[
          styles.innerContainer,
          {backgroundColor: progressbarBackgroundColor},
        ]}
        onLayout={e => {
          const {width} = e.nativeEvent.layout;
          setContainerWidth(width);
        }}>
        {/* progress bar 애니메이션 */}
        <Animated.View
          style={[styles.progressWrapper, {width: animatedBarWidth}]}>
          <LinearGradient
            colors={['#F5C0F70F', '#F79E90']}
            locations={[0, 0.83]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={[styles.progressBar, {height}]}
          />
        </Animated.View>
        {/* 얼굴은 progress bar의 오른쪽 끝 기준(+8)으로 애니메이트 */}
        <Animated.View
          style={[
            styles.characterContainer,
            {left: animatedFaceLeft, zIndex: 10, elevation: 10},
          ]}>
          {renderFace()}
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  innerContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  progressBar: {
    width: '100%',
  },
  progressWrapper: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  characterContainer: {
    position: 'absolute',
    top: '50%',
    transform: [{translateY: -30}],
  },
});

export default MemberProgressBar;
