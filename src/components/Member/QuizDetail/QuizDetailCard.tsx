import {StyleSheet, View} from 'react-native';
import {CustomText} from '../../shared';

import QuizDetailChat from '../../../assets/icons/quiz_detail_chat.svg';
import QuizDetailCheck from '../../../assets/icons/quiz_detail_check.svg';
import QuizDetailXmark from '../../../assets/icons/quiz_detail_xmark.svg';
import QuizDetailLock from '../../../assets/icons/quiz_detail_lock.svg';

interface QuizDetailCardProps {
  index: number;
  quiz: string;
  answer: string | null;
  isCorrect: boolean;
  isDummy: boolean;
  trial: number;
}

const QuizDetailCard = ({
  index,
  quiz,
  answer,
  isCorrect,
  isDummy,
  trial,
}: QuizDetailCardProps) => {
  const renderAnswer = () => {
    if (trial <= 0) {
      return (
        <View style={styles.answerContainer}>
          <View
            style={[
              styles.quizBadge,
              {
                backgroundColor: '#C5C5C7',
              },
            ]}>
            <QuizDetailLock />
          </View>
          <CustomText
            weight="Bold"
            style={[
              styles.quizAnswer,
              {
                color: '#939396',
              },
            ]}>
            아직 퀴즈 풀기 전이에요
          </CustomText>
        </View>
      );
    } else if (isDummy) {
      return (
        <View style={styles.answerContainer}>
          <View
            style={[
              styles.quizBadge,
              {
                backgroundColor: '#CE5419',
              },
            ]}>
            <QuizDetailChat />
          </View>
          <View
            style={{
              flexDirection: 'row',
              gap: 5,
              alignItems: 'center',
            }}>
            <CustomText
              weight="Bold"
              style={[
                styles.quizAnswer,
                {
                  color: '#222225',
                },
              ]}>
              {answer}
            </CustomText>
            <View style={styles.circle} />
            <CustomText
              weight="Bold"
              style={[
                styles.quizAnswer,
                {
                  color: '#939396',
                },
              ]}>
              {`${trial}회 시도`}
            </CustomText>
          </View>
        </View>
      );
    } else {
      if (isCorrect) {
        return (
          <View style={styles.answerContainer}>
            <View
              style={[
                styles.quizBadge,
                {
                  backgroundColor: '#CE5419',
                },
              ]}>
              <QuizDetailCheck />
            </View>
            <View
              style={{
                flexDirection: 'row',
                gap: 5,
                alignItems: 'center',
              }}>
              <CustomText
                weight="Bold"
                style={[
                  styles.quizAnswer,
                  {
                    color: '#222225',
                  },
                ]}>
                {answer}
              </CustomText>
              <View style={styles.circle} />
              <CustomText
                weight="Bold"
                style={[
                  styles.quizAnswer,
                  {
                    color: '#939396',
                  },
                ]}>
                {`${trial}회 시도`}
              </CustomText>
            </View>
          </View>
        );
      } else {
        return (
          <View style={styles.answerContainer}>
            <View
              style={[
                styles.quizBadge,
                {
                  backgroundColor: '#77777A',
                },
              ]}>
              <QuizDetailXmark />
            </View>
            <View
              style={{
                flexDirection: 'row',
                gap: 5,
                alignItems: 'center',
              }}>
              <CustomText
                weight="Bold"
                style={[
                  styles.quizAnswer,
                  {
                    color: '#222225',
                  },
                ]}>
                {answer}
              </CustomText>
              <View style={styles.circle} />
              <CustomText
                weight="Bold"
                style={[
                  styles.quizAnswer,
                  {
                    color: '#939396',
                  },
                ]}>
                {`${trial}회 시도`}
              </CustomText>
            </View>
          </View>
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <CustomText weight="ExtraBold" style={styles.quizText}>
        <CustomText weight="ExtraBold" style={styles.numberText}>
          {`0${index + 1}  `}
        </CustomText>
        {quiz}
      </CustomText>
      {renderAnswer()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#F7F7F9',
    borderRadius: 20,
    paddingLeft: 16,
    paddingVertical: 12,
    marginRight: 12,
    flexDirection: 'column',
    gap: 4,
  },
  answerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  quizBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quizAnswer: {
    fontSize: 16,
    lineHeight: 24,
  },
  numberText: {
    fontSize: 18,
    color: '#CE5419',
    lineHeight: 25,
  },
  quizText: {
    fontSize: 18,
    color: '#222225',
    lineHeight: 25,
  },
  circle: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E9E9EC',
  },
});

export default QuizDetailCard;
