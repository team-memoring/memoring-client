import {
  ParamListBase,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CustomText} from '../../components/shared';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import BackArrow from '../../assets/icons/back_arrow.svg';
import QuizDetailCard from '../../components/Member/QuizDetail/QuizDetailCard';

const DUMMY_IMAGE = '/Users/kyuho/Downloads/dummy.png';

const dummyQuiz = [
  {
    id: 0,
    quiz: '관악산 등반을 누구와 함께 했나요?',
    answer: '아들',
    imageUrl: DUMMY_IMAGE,
    isCorrect: true,
    isDummy: false,
    trial: 2,
  },
  {
    id: 1,
    quiz: '정상에서의 기분이 어떠셨나요?',
    answer: '행복했어요',
    imageUrl: DUMMY_IMAGE,
    isCorrect: true,
    isDummy: true,
    trial: 1,
  },
  {
    id: 2,
    quiz: '등반을 시작한 곳은 어디였나요?',
    answer: '관악산 입구',
    imageUrl: null,
    isDummy: false,
    isCorrect: false,
    trial: 1,
  },
  {
    id: 3,
    quiz: '하산한 뒤 어떤 산에 가고 싶다고 하셨나요? 궁금해요',
    answer: null,
    imageUrl: DUMMY_IMAGE,
    isDummy: false,
    isCorrect: false,
    trial: 0,
  },
  {
    id: 4,
    quiz: '하산한 뒤 어떤 산에 가고 싶다고 하셨나요? 궁금해요',
    answer: null,
    imageUrl: DUMMY_IMAGE,
    isDummy: false,
    isCorrect: false,
    trial: 0,
  },
];

type RootStackParamList = {
  MemberQuizDetail: {quizId: number};
};

const MemberQuizDetailScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'MemberQuizDetail'>>();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  //   TODO: fetch quiz detail
  const quizId = route.params.quizId;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="#fff" barStyle="dark-content" />
      <View
        style={{
          paddingHorizontal: 16,
        }}>
        <View>
          <Image source={{uri: DUMMY_IMAGE}} style={styles.quizImage} />
          <Pressable
            style={styles.backButton}
            onPress={() => {
              navigation.goBack();
            }}>
            <BackArrow color="#222225" />
          </Pressable>
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: 16,
          paddingTop: 24,
          paddingBottom: 16,
        }}>
        <CustomText
          weight="ExtraBold"
          style={{
            fontSize: 24,
            color: '#222225',
            lineHeight: 32,
          }}>
          {`${'한강 나들이'}의`}
        </CustomText>
        <CustomText
          weight="ExtraBold"
          style={{
            fontSize: 24,
            color: '#222225',
            lineHeight: 32,
          }}>
          퀴즈 결과를 확인해볼까요?
        </CustomText>
      </View>
      <ScrollView
        style={{
          paddingHorizontal: 16,
        }}>
        <View
          style={{
            flexDirection: 'column',
            gap: 12,
            marginBottom: 24,
          }}>
          {dummyQuiz.map((quiz, index) => {
            return (
              <QuizDetailCard
                key={index}
                index={index}
                quiz={quiz.quiz}
                answer={quiz.answer}
                isCorrect={quiz.isCorrect}
                isDummy={quiz.isDummy}
                trial={quiz.trial}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  quizImage: {width: '100%', height: 235, borderRadius: 16},
  backButton: {
    position: 'absolute',
    left: 12,
    top: 12,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#fff',
  },
});

export default MemberQuizDetailScreen;
