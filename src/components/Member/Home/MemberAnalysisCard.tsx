import {Animated, Easing, Pressable, StyleSheet, View} from 'react-native';
import {CustomText} from '../../shared';
import {
  MEMBER_HOME_DURATION,
  rateTrend,
} from '../../../screens/Member/MemberHomeScreen';

import Trend from '../../../assets/graphics/trend.svg';
import {useEffect, useRef, useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {getStatistics} from '../../../api/memoring/statistics';

const MemberAnalysisCard = () => {
  const {data} = useQuery({
    queryKey: ['getStatistics'],
    queryFn: async () => getStatistics(),
  });

  const getTrend = () => {
    if (!data) return 'stable';

    if (data?.data[0].correctRate > data?.data[1].correctRate) {
      return 'up';
    } else if (data?.data[0].correctRate < data?.data[1].correctRate) {
      return 'down';
    }
    return 'stable';
  };

  const getMonth = (dateStr?: string) => {
    if (!dateStr) {
      const date = new Date();
      return date.getMonth() + 1;
    }

    const month = parseInt(dateStr.split('-')[1], 10); // "02" -> 2
    return month;
  };

  const trend = getTrend();
  const month = getMonth(data?.data[0].month);
  const rate = data?.data[0].correctRate || 0;
  const rateDiff =
    (data?.data[0].correctRate || 0) - (data?.data[1].correctRate || 0);

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

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

      <Pressable
        style={styles.button}
        onPress={() => {
          navigation.navigate('MemberStatistics');
        }}>
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
