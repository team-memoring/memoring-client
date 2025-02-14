import React, {useState, useRef, useEffect} from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  Animated,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Character, CustomText, PaginationHeader} from '../../components/shared';
import {ParamListBase, useNavigation} from '@react-navigation/native';

import {CharacterType} from '../../components/shared/Character';

const questions = [
  {
    id: 1,
    question: '하노이에서 시계를 잃어버린 가족은 누굴까요?',
    choices: ['첫째 아들 규호', '며느리', '둘째 아들 현빈', '똥강아지 손자'],
    answer: '첫째 아들 규호',
  },
  {
    id: 2,
    question: '첫 째날 점심때 먹었던 메뉴는?',
    choices: ['쌀국수', '분짜', '반미', '껌땀 사이공'],
    answer: '반미',
  },
];

const QuizScreen = (): React.JSX.Element => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleAnswer = (selectedOption: string) => {
    const isCorrect = selectedOption;
    navigation.navigate('ResultScreen', {isCorrect, onNext: goToNextQuestion});
  };

  const goToNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const [characterType, setCharacterType] = useState<CharacterType>('open');
  const animatedTranslateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(animatedTranslateY, {
      toValue: currentIndex === 2 ? 120 : 0,
      useNativeDriver: true,
    }).start();
  }, [currentIndex]);

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.quizcontainer}>
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
        <CustomText
          weight="ExtraBold"
          style={{
            fontSize: 32,
            color: '#222225',
            paddingTop: 40,
            paddingBottom: 12,
            paddingHorizontal: 36,
            textAlign: 'center',
          }}>
          {questions[currentIndex].question}
        </CustomText>
        {questions[currentIndex].choices.map((choice, index) => (
          <View style={{paddingHorizontal: 16}}>
            <TouchableOpacity
              key={index}
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
        <Character
          type={characterType}
          bottom={-610}
          animatedTransformValue={animatedTranslateY}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  quizcontainer: {
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
});

export default QuizScreen;
