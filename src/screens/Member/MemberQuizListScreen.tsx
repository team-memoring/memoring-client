import {
  ParamListBase,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import BackArrow from '../../assets/icons/back_arrow.svg';
import {CustomText} from '../../components/shared';
import defaultImage from '../../assets/graphics/default_image.png';

import {QuizPair, Quiz, QuizStorage} from '../../lib/types/quizzes';
import {postQuizzes} from '../../api/memoring/quizzes';

const DEFAULT_IMAGE = '/Users/kyuho/Downloads/dummy.png';

const MemberQuizListScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute<RouteProp<{params: {data: QuizPair[]}}, 'params'>>();

  const quizzes = route.params?.data || [];
  const flattenQuizzes = (data: any[]): Quiz[] => {
    return data.flatMap(item =>
      Object.entries(item).map(([key, value]: [string, any]) => ({
        id: value.id,
        quiz: value.quiz,
        option: value.option,
        answer: value.answer,
        isDummy: key === 'Dummy_quizzes',
        imageUrl: value.url ?? null,
      })),
    );
  };
  const flattenedQuizzes = flattenQuizzes(quizzes);
  console.log('flattened on list:', flattenedQuizzes);

  const transformQuizData = (quizData: Quiz[]): QuizStorage[] => {
    return quizData.map(item => ({
      quiz_question: item.quiz,
      quiz_completion_state: 0,
      user_answer: null,
      quiz_choice_1: item.option[1],
      quiz_choice_2: item.option[2],
      quiz_choice_3: item.option[3],
      quiz_answer: item.option[0],
      quiz_img: item.imageUrl || null,
      is_dummy: item.isDummy,
      is_correct: null,
      memory_id: item.id,
      family_id: 0,
    }));
  };

  const REP_IMAGE = flattenedQuizzes[0].imageUrl || DEFAULT_IMAGE;

  const handleRegenaratePress = () => {
    navigation.navigate('MemberQuizGen');
  };

  const handleRegisterPress = () => {
    const transformedQuizzes = transformQuizData(flattenedQuizzes);
    console.log('transformedQuizzes:', transformedQuizzes);

    postQuizzes(transformedQuizzes);
    navigation.navigate('MemberQuizComplete', {data: flattenedQuizzes});
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.header}>
        <Pressable
          onPress={handleRegenaratePress}
          style={styles.backButtonContainer}>
          <BackArrow color="#77777A" />
          <CustomText
            weight="ExtraBold"
            style={{fontSize: 16, color: '#77777A'}}>
            재생성
          </CustomText>
        </Pressable>
      </View>
      <Image source={{uri: REP_IMAGE}} style={styles.image} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          paddingHorizontal: 16,
          marginTop: 16,
        }}>
        <View style={styles.quizContainer}>
          {flattenedQuizzes.map((quiz, index) => (
            <View key={index} style={styles.quizBox}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={styles.quizTextContainer}>
                  <CustomText weight="ExtraBold" style={styles.quizText}>
                    <CustomText weight="ExtraBold" style={styles.numberText}>
                      {`0${index + 1} `}
                    </CustomText>
                    {quiz.quiz}
                  </CustomText>
                  {quiz.isDummy ? (
                    <CustomText weight="Bold" style={styles.dummyText}>
                      정답이 없는 대화 문제입니다.
                    </CustomText>
                  ) : (
                    <CustomText weight="Bold" style={styles.answerText}>
                      {quiz.answer}
                    </CustomText>
                  )}
                </View>

                <Image
                  source={quiz.imageUrl ? {uri: quiz.imageUrl} : defaultImage}
                  style={styles.quizImage}
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.nextButtonWrapper}>
        <Pressable
          onPress={handleRegisterPress}
          style={[
            styles.nextButton,
            {paddingBottom: Platform.OS === 'ios' ? 52 : 24},
          ]}>
          <CustomText
            weight="ExtraBold"
            style={{
              color: '#fff',
              fontSize: 20,
            }}>
            퀴즈 등록
          </CustomText>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 13,
    backgroundColor: '#F0F0F3',
    borderRadius: 50,
  },
  image: {
    width: '100%',
    resizeMode: 'cover',
    height: 235,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginTop: 4,
  },
  quizContainer: {
    flexDirection: 'column',
    gap: 12,
    paddingBottom: Platform.OS === 'ios' ? 78 : 106,
  },
  quizBox: {
    paddingLeft: 16,
    paddingRight: 12,
    paddingVertical: 12,
    backgroundColor: '#F0F0F3',
    borderRadius: 20,
  },
  quizTextContainer: {
    paddingVertical: 4,
    flexDirection: 'column',
    gap: 2,
    flex: 1,
    marginRight: 12,
  },
  quizText: {
    fontSize: 18,
    color: '#222225',
    lineHeight: 25,
  },
  numberText: {
    fontSize: 18,
    color: '#939396',
    lineHeight: 25,
  },
  answerText: {
    fontSize: 16,
    color: '#222225',
    marginTop: 2,
    lineHeight: 24,
  },
  dummyText: {
    fontSize: 16,
    color: '#C5C5C7',
    marginTop: 2,
    lineHeight: 24,
  },
  quizImage: {
    width: 68,
    height: 68,
    borderRadius: 12,
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
  },
});

export default MemberQuizListScreen;
