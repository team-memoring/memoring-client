import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Animated,
  View,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {GestureHandlerRootView, Pressable} from 'react-native-gesture-handler';

import {PaginationHeader, Character, CustomText} from '../../components/shared';
import {
  ParamListBase,
  useNavigation,
  useRoute,
  RouteProp,
} from '@react-navigation/native';

import {
  CharacterType,
  CharacterDecorationType,
} from '../../components/shared/Character';
import ResultView from '../../components/QuizResult/ResultView';
import DummyResultView from '../../components/QuizResult/DummyResultView';
import {
  getQuizzesShowquizMemoryId,
  patchQuizzedUpdateQuizId,
} from '../../api/memoring/quizzes';
import {QuizMain, QuizDummy} from '../../lib/types/quizzes';
import Config from 'react-native-config';

type RootStackParamList = {
  Quiz: {memoryId: number; title: string};
};

const QuizScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Quiz'>>();
  const {memoryId, title} = route.params;
  const [questions, setQuestions] = useState<QuizMain[]>([]);

  const [characterType, setCharacterType] =
    useState<CharacterType>('openRight');
  const [characterDecorationType, setCharacterDecorationType] =
    useState<CharacterDecorationType>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [llmAnswer, setLlmAnswer] = useState<QuizDummy | null>(null);

  const animatedTranslateY = useRef(new Animated.Value(400)).current;

  const shuffleArray = (array: string[]) => {
    return array
      .map(value => ({value, sort: Math.random()}))
      .sort((a, b) => a.sort - b.sort)
      .map(({value}) => value);
  };

  const handleAnswer = async (choice: string) => {
    if (questions[currentIndex].is_dummy) {
      setSelectedAnswer(choice);
      setShowResult(true);

      const llmAnswerData = await patchQuizzedUpdateQuizId(
        questions[currentIndex].quiz_id,
        choice,
      );
      setLlmAnswer(llmAnswerData.data);

      setCharacterType('happy');
      setCharacterDecorationType('heart');
    } else {
      const isCorrect = choice === questions[currentIndex].quiz_answer;
      const mainAnswerData = await patchQuizzedUpdateQuizId(
        questions[currentIndex].quiz_id,
        choice,
      );

      setSelectedAnswer(choice);
      setShowResult(true);

      setCharacterType(isCorrect ? 'happy' : 'sad');
      setCharacterDecorationType(isCorrect ? 'heart' : 'tear');
    }

    Animated.spring(animatedTranslateY, {
      toValue: -40,
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
      toValue: questions[currentIndex].quiz_img ? 1000 : 180,
      useNativeDriver: true,
      damping: 10,
      stiffness: 120,
      mass: 1.5,
    }).start();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(memoryId);
        const questionData = await getQuizzesShowquizMemoryId(memoryId);
        console.log('QuestionData:', questionData);
        setQuestions(questionData.data.quizzes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [memoryId]);

  useEffect(() => {
    if (questions.length > 0) {
      Animated.spring(animatedTranslateY, {
        toValue: questions[currentIndex].quiz_img ? 1000 : 180,
        useNativeDriver: true,
        damping: 10,
        stiffness: 120,
        mass: 1.5,
      }).start();
    }
  }, [currentIndex, questions]);

  if (questions.length === 0) return null;

  return (
    <GestureHandlerRootView>
      <SafeAreaView
        style={[
          styles.container,
          {
            backgroundColor: showResult
              ? questions[currentIndex].is_dummy
                ? '#f9ebe4'
                : selectedAnswer === questions[currentIndex].quiz_answer
                ? '#f9ebe4'
                : '#F0F0F0'
              : styles.container.backgroundColor,
          },
        ]}>
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
            {questions[currentIndex].is_dummy ? (
              <DummyResultView
                initialReact={llmAnswer?.initial_react || ''}
                mainReact={llmAnswer?.main_react || ''}
              />
            ) : (
              <ResultView
                selectedAnswer={selectedAnswer ?? ''}
                answer={questions[currentIndex].quiz_answer ?? ''}
              />
            )}
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
                paddingTop: questions[currentIndex].quiz_img ? 0 : 40,
                paddingBottom: 12,
                paddingHorizontal: 36,
                marginBottom: questions[currentIndex].quiz_img ? 10 : 80,
                textAlign: 'center',
              }}>
              {questions[currentIndex].quiz_question}
            </CustomText>
            {questions[currentIndex].quiz_img ? (
              <Image
                source={{
                  uri: `${Config.API_BASE_URL}/${questions[currentIndex].quiz_img}`,
                }}
                style={styles.image}
              />
            ) : (
              <></>
            )}
            {shuffleArray([
              questions[currentIndex].quiz_answer,
              questions[currentIndex].quiz_choice_1,
              questions[currentIndex].quiz_choice_2,
              questions[currentIndex].quiz_choice_3,
            ]).map((choice, index) => (
              <View key={index} style={{paddingHorizontal: 16}}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleAnswer(choice)}>
                  <CustomText
                    weight="ExtraBold"
                    style={{fontSize: 28, color: '000000'}}>
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
  image: {
    width: '100%',
    height: 246,
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
});

export default QuizScreen;
