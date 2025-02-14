import {ParamListBase, useNavigation} from '@react-navigation/native';
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

const DUMMY_IMAGE = '/Users/kyuho/Downloads/dummy.png';

const dummyQuiz = [
  {
    id: 0,
    quiz: '관악산 등반을 누구와 함께 했나요?',
    answer: '아들',
    imageUrl: DUMMY_IMAGE,
    isDummy: false,
  },
  {
    id: 1,
    quiz: '정상에서 무엇을 먹었나요?',
    answer: '라면만',
    imageUrl: DUMMY_IMAGE,
    isDummy: false,
  },
  {
    id: 2,
    quiz: '등반을 시작한 곳은 어디였나요?',
    answer: '관악산 입구',
    imageUrl: null,
    isDummy: false,
  },
  {
    id: 3,
    quiz: '하산한 뒤 어떤 산에 가고 싶다고 하셨나요? 궁금해요',
    answer: '설악산',
    imageUrl: DUMMY_IMAGE,
    isDummy: false,
  },
  {
    id: 4,
    quiz: '하산한 뒤 어떤 산에 가고 싶다고 하셨나요?',
    answer: '설악산',
    imageUrl: null,
    isDummy: true,
  },
];

const MemberQuizListScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleRegenaratePress = () => {
    navigation.navigate('MemberQuizGen');
  };

  const handleRegisterPress = () => {
    navigation.navigate('MemberQuizComplete');
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
      <Image source={{uri: DUMMY_IMAGE}} style={styles.image} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          paddingHorizontal: 16,
          marginTop: 16,
        }}>
        <View style={styles.quizContainer}>
          {dummyQuiz.map((quiz, index) => (
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
