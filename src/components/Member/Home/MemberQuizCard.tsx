import {Animated, Pressable, StyleSheet, View} from 'react-native';
import {IMemory} from '../../../lib/model/i-memory';
import {CustomText} from '../../shared';

// import CardStarColored from '../../../assets/icons/card_star_colored.svg';
// import CardStarGray from '../../../assets/icons/card_star_grey.svg';
import dayjs from 'dayjs';
import {useEffect, useRef} from 'react';

interface MemberQuizCardProps
  extends Pick<
    IMemory,
    | 'id'
    | 'title'
    | 'totalQuizCount'
    | 'solvedQuizCount'
    // TODO: add later
    // | 'creator'
    | 'createdAt'
  > {
  onPress: (quizId: number) => void;
}

const MemberQuizCard = ({onPress, ...props}: MemberQuizCardProps) => {
  const formatDate = (date: string) => {
    return dayjs(new Date(date)).format('YYYY.MM.DD');
  };

  const getStatusText = () => {
    if (props.solvedQuizCount === 0) {
      return '풀이전';
    } else if (props.solvedQuizCount < props.totalQuizCount) {
      return '풀이중';
    }
    return '풀이완료';
  };

  const status = getStatusText();

  const isColored = status === '풀이중';

  const tagStyle = () => {
    if (isColored) {
      return {backgroundColor: '#f9ebe4', color: '#CE5419'};
    }
    return {backgroundColor: '#F0F0F3', color: '#939396'};
  };
  const progress =
    props.totalQuizCount > 0
      ? (props.solvedQuizCount / props.totalQuizCount) * 100
      : 0;

  const progressBarColor = isColored ? '#CE5419' : '#939396';

  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: progress,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        onPress(props.id);
      }}>
      <View style={[styles.tag, {backgroundColor: tagStyle().backgroundColor}]}>
        <CustomText
          weight="Bold"
          style={{
            fontSize: 12,
            color: tagStyle().color,
            lineHeight: 12,
          }}>
          {status}
        </CustomText>
      </View>
      <CustomText
        weight="ExtraBold"
        style={{
          fontSize: 16,
          color: '#222225',
          marginTop: 4,
          lineHeight: 25,
        }}>
        {props.title}
      </CustomText>
      <View
        style={{
          flexDirection: 'row',
          gap: 5,
          alignItems: 'center',
          marginTop: 4,
        }}>
        {/* TODO: add later */}
        {/* <View
          style={{
            flexDirection: 'row',
            gap: 2,
          }}>
          {isColored ? (
            <CardStarColored width={16} height={16} />
          ) : (
            <CardStarGray width={16} height={16} />
          )}
          <CustomText
            weight="Bold"
            style={{
              fontSize: 14,
              color: '#555558',
            }}>
            {props.creator}
          </CustomText>
        </View>
        <View style={styles.circle} /> */}
        <CustomText
          weight="Bold"
          style={{
            fontSize: 14,
            color: '#939396',
          }}>
          {formatDate(props.createdAt)}
        </CustomText>
      </View>
      <View
        style={{
          marginTop: 40,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
        }}>
        <View style={styles.progressContainer}>
          <View
            style={[
              styles.progressBar,
              {width: `${progress}%`, backgroundColor: progressBarColor},
            ]}
          />
        </View>
        <CustomText
          weight="ExtraBold"
          style={{
            fontSize: 16,
            color: isColored ? '#CE5419' : '#939396',
            alignSelf: 'flex-end',
          }}>
          {props.solvedQuizCount}/{props.totalQuizCount}개
        </CustomText>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    alignSelf: 'flex-start',
  },
  tag: {
    padding: 8,
    borderRadius: 28,
    alignSelf: 'flex-start',
  },
  circle: {
    width: 4,
    height: 4,
    borderRadius: 10,
    backgroundColor: '#E9E9EC',
  },
  progressContainer: {
    width: 88,
    height: 8,
    backgroundColor: '#F0F0F3',
    borderRadius: 30,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 30,
  },
});

export default MemberQuizCard;
