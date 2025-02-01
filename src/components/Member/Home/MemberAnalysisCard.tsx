import {Animated, Easing, Pressable, StyleSheet, View} from 'react-native';
import {CustomText} from '../../shared';
import {
  MEMBER_HOME_DURATION,
  tempTrend,
} from '../../../screens/Member/MemberHomeScreen';

import Trend from '../../../assets/graphics/trend.svg';
import {useEffect, useRef, useState} from 'react';

interface MemberAnalysisCardProps {
  trend: tempTrend;
  month: number;
  rate: number;
  rateDiff?: number;
}

const MemberAnalysisCard = ({
  trend,
  month,
  rate,
  rateDiff,
}: MemberAnalysisCardProps) => {
  const rateDiffValue = rateDiff ?? 0;

  const animatedRate = useRef(new Animated.Value(0)).current;
  const animatedRateDiff = useRef(new Animated.Value(0)).current;

  const [displayRate, setDisplayRate] = useState(0);
  const [displayRateDiff, setDisplayRateDiff] = useState(0);

  useEffect(() => {
    Animated.timing(animatedRate, {
      toValue: rate,
      easing: Easing.out(Easing.exp),
      duration: MEMBER_HOME_DURATION,
      useNativeDriver: false,
    }).start();

    Animated.timing(animatedRateDiff, {
      toValue: rateDiffValue,
      easing: Easing.out(Easing.exp),
      duration: MEMBER_HOME_DURATION,
      useNativeDriver: false,
    }).start();

    // 숫자 업데이트 감지 (애니메이션 진행 중 값 반영)
    animatedRate.addListener(v => setDisplayRate(Math.round(v.value)));
    animatedRateDiff.addListener(v => setDisplayRateDiff(Math.round(v.value)));

    return () => {
      animatedRate.removeAllListeners();
      animatedRateDiff.removeAllListeners();
    };
  }, [rate, rateDiff]);

  const getTrendStyle = () => {
    switch (trend) {
      case 'up':
        return {
          transform: [{rotate: '-73deg'}],
          position: 'absolute' as const,
          top: 0,
          right: 28,
        };
      case 'stable':
        return {
          transform: [{rotate: '-40deg'}],
          position: 'absolute' as const,
          top: 20,
          right: 44,
        };
      default:
        return {
          transform: [{rotate: '0deg'}],
          position: 'absolute' as const,
          top: 16,
          right: 16,
        };
    }
  };

  const getTrendMessage = () => {
    switch (trend) {
      case 'up':
        return `전월 대비 ${displayRateDiff}% 상승했어요!`;
      case 'down':
        return `전월 대비 ${displayRateDiff}% 감소했어요!`;
      default:
        return '전월과 동일한 정답율이에요!';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <CustomText weight="ExtraBold" style={{fontSize: 20, color: '#222225'}}>
          {`${month}월 정답율`}
        </CustomText>
        <CustomText
          weight="ExtraBold"
          style={{
            fontSize: 20,
            color: '#CE5419',
          }}>
          {`${displayRate}%`}
        </CustomText>
      </View>
      <CustomText
        weight="Bold"
        style={{
          fontSize: 15,
          color: '#77777A',
          marginTop: 4,
        }}>
        {getTrendMessage()}
      </CustomText>
      <Trend width={145} height={137} style={getTrendStyle()} />
      {/* TODO: add navigate */}
      <Pressable style={styles.button} onPress={() => true}>
        <CustomText
          weight="ExtraBold"
          style={{
            fontSize: 16,
            color: '#fff',
          }}>
          전체 결과 보기
        </CustomText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 16,
    borderRadius: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  button: {
    backgroundColor: '#444447',
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 96,
  },
});

export default MemberAnalysisCard;
