import {Animated, Easing, Pressable, StyleSheet, View} from 'react-native';
import {CustomText} from '../../shared';
import MemberProgressBar from './MemberProgressbar';
import {useEffect, useRef, useState} from 'react';
import {MEMBER_HOME_DURATION} from '../../../screens/Member/MemberHomeScreen';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface MemberQuizProgressCardProps {
  percentage: number;
}

const MemberQuizProgressCard = ({percentage}: MemberQuizProgressCardProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const animatedPercentage = useRef(new Animated.Value(0)).current;

  const [displayPercentage, setDisplayPercentage] = useState(0);

  const getProgressMessage = () => {
    if (percentage === 0) {
      return '아직 퀴즈 풀이 전이에요!';
    } else if (percentage < 30) {
      return '열심히 퀴즈 풀이 중이에요!';
    } else if (percentage < 70) {
      return '열심히 퀴즈 풀이 중이에요!';
    } else if (percentage < 99) {
      return '곧 모든 문제의 풀이가 끝나요!';
    } else {
      return '모든 문제의 풀이를 완료했어요!';
    }
  };

  useEffect(() => {
    Animated.timing(animatedPercentage, {
      toValue: percentage,
      easing: Easing.out(Easing.exp),
      duration: MEMBER_HOME_DURATION,
      useNativeDriver: false,
    }).start();

    // 숫자 업데이트 감지 (애니메이션 진행 중 값 반영)
    animatedPercentage.addListener(v =>
      setDisplayPercentage(Math.round(v.value)),
    );

    return () => {
      animatedPercentage.removeAllListeners();
    };
  }, [animatedPercentage]);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          paddingVertical: 4,
          marginBottom: 16,
        }}>
        <View>
          <View style={styles.titleContainer}>
            <CustomText
              weight="ExtraBold"
              style={{fontSize: 20, color: '#222225'}}>
              퀴즈 진행도
            </CustomText>
            <CustomText
              weight="ExtraBold"
              style={{
                fontSize: 20,
                color: '#CE5419',
              }}>
              {`${displayPercentage}%`}
            </CustomText>
          </View>
          <CustomText
            weight="Bold"
            style={{
              fontSize: 15,
              color: '#77777A',
              marginTop: 4,
            }}>
            {getProgressMessage()}
          </CustomText>
        </View>
        <Pressable
          style={{
            backgroundColor: '#444447',
            paddingVertical: 16.5,
            paddingHorizontal: 20,
            borderRadius: 60,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('MemberRegister')}>
          <CustomText
            weight="ExtraBold"
            style={{
              fontSize: 15,
              color: '#fff',
            }}>
            퀴즈 등록하기
          </CustomText>
        </Pressable>
      </View>
      <MemberProgressBar progress={percentage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 4,
  },
});

export default MemberQuizProgressCard;
