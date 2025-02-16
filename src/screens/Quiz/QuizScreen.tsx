import React, {useState, useRef, useEffect} from 'react';
import {
  StatusBar,
  StyleSheet,
  Animated,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp, useRoute} from '@react-navigation/native';

import {GestureHandlerRootView, Pressable} from 'react-native-gesture-handler';

import {PaginationHeader, Character, CustomText} from '../../components/shared';
import {ParamListBase, useNavigation} from '@react-navigation/native';

import {
  CharacterType,
  CharacterDecorationType,
} from '../../components/shared/Character';

// TODO: change to api
const questions = [
  {
    id: 1,
    question: '오리엔테이션 간식으로 받은 것은 무엇일까요?',
    choices: ['짜장면', '샌드위치', '쌀국수', '초밥'],
    answer: '샌드위치',
  },
  {
    id: 2,
    question: '배정 받았던 반 이름은 무엇일까요?',
    choices: ['사랑반', '열정반', '패기반', '우정반'],
    answer: '패기반',
  },
  {
    id: 3,
    question: '우리팀 팀장 이름은 무엇일까요?',
    choices: ['천민규', '안치욱', '이태훈', '이규호'],
    answer: '이규호',
  },
  {
    id: 4,
    question: '첫째날 배웠던 과목의 주제는 무엇일까요?',
    choices: ['인공지능', '애저', '독일어', '컴퓨터 구조'],
    answer: '인공지능',
  },
];

type QuizParams = {
  Quiz: {
    title: string;
  };
};

type QuizScreenRouteProp = RouteProp<QuizParams, 'Quiz'>;

const QuizScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute<QuizScreenRouteProp>();
  const title = route.params?.title;

  const [characterType, setCharacterType] =
    useState<CharacterType>('openRight');
  const [characterDecorationType, setCharacterDecorationType] =
    useState<CharacterDecorationType>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const animatedTranslateY = useRef(new Animated.Value(400)).current;

  const handleAnswer = (choice: string) => {
    const isCorrect = choice === questions[currentIndex].answer;

    setSelectedAnswer(choice);
    setShowResult(true);

    setCharacterType(isCorrect ? 'happy' : 'sad');
    setCharacterDecorationType(isCorrect ? 'heart' : 'tear');
    Animated.spring(animatedTranslateY, {
      toValue: -100,
      useNativeDriver: true,
      damping: 15,
      stiffness: 120,
      mass: 1.5,
    }).start();
  };

  const handelQuestionPress = () => {
    if (currentIndex !== questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      navigation.navigate('QuizEnd', {title});
    }
    setShowResult(false);

    setCharacterType('openRight');
    setCharacterDecorationType(null);
    Animated.spring(animatedTranslateY, {
      toValue: 180,
      useNativeDriver: true,
      damping: 10,
      stiffness: 120,
      mass: 1.5,
    }).start();
  };

  useEffect(() => {
    Animated.spring(animatedTranslateY, {
      toValue: 180,
      useNativeDriver: true,
      damping: 10,
      stiffness: 120,
      mass: 1.5,
    }).start();
  }, []);

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.container}>
        <StatusBar
          translucent
          backgroundColor="#f9ebe4"
          barStyle="dark-content"
        />
        <PaginationHeader
          currentIndex={currentIndex}
          totalSteps={questions.length}
          onBackPress={() => navigation.goBack()}
        />
        <Character
          type={characterType}
          decoration={characterDecorationType}
          animatedTransformValue={animatedTranslateY}
        />
        {showResult ? (
          <>
            <CustomText
              weight="ExtraBold"
              style={{
                fontSize: 28,
                color:
                  selectedAnswer === questions[currentIndex].answer
                    ? '#CE5419'
                    : '939396',
                paddingTop: 120,
                paddingHorizontal: 46.5,
                textAlign: 'center',
              }}>
              {selectedAnswer === questions[currentIndex].answer
                ? '정답이에요!'
                : '아쉬워요...'}
            </CustomText>
            <CustomText
              weight="ExtraBold"
              style={{
                fontSize: 36,
                color: '222225',
                paddingTop: 6,
                paddingHorizontal: 46.5,
                textAlign: 'center',
              }}>
              {selectedAnswer}
            </CustomText>
            <View style={[styles.nextButtonWrapper]}>
              <Pressable
                onPress={handelQuestionPress}
                style={[
                  styles.nextButton,
                  {paddingBottom: Platform.OS === 'ios' ? 52 : 24},
                ]}>
                <CustomText
                  weight="ExtraBold"
                  style={{
                    color: '#fff',
                    fontSize: 28,
                  }}>
                  다음으로
                </CustomText>
              </Pressable>
            </View>
          </>
        ) : (
          <>
            <CustomText
              weight="ExtraBold"
              style={{
                fontSize: 32,
                color: '#222225',
                paddingTop: 40,
                paddingBottom: 12,
                paddingHorizontal: 36,
                marginBottom: 80, // Edit
                textAlign: 'center',
              }}>
              {questions[currentIndex].question}
            </CustomText>
            {questions[currentIndex].choices.map((choice, index) => (
              <View key={index} style={{paddingHorizontal: 16}}>
                <TouchableOpacity style={styles.button}>
                  <CustomText
                    weight="ExtraBold"
                    style={{fontSize: 28, color: '000000'}}
                    onPress={() => handleAnswer(choice)}>
                    {choice}
                  </CustomText>
                </TouchableOpacity>
              </View>
            ))}
          </>
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9ebe4',
  },
  button: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    alignItems: 'center',
    paddingVertical: 24,
    marginBottom: 12,
  },
  nextButtonWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    backgroundColor: '#222225',
  },
  nextButton: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: Platform.OS === 'ios' ? 52 : 24,
    backgroundColor: '#222225',
  },
});

export default QuizScreen;
