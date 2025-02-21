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
import {useQuery} from '@tanstack/react-query';
import {getQuizzesQuizanswerMemoryId} from '../../api/memoring/quizzes';
import {useEffect, useState} from 'react';

import Config from 'react-native-config';

const DEFAULT_IMAGE = '../../assets/graphics/default_memory_image.png';

type RootStackParamList = {
  MemberQuizDetail: {memoryId: number};
};

const MemberQuizDetailScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'MemberQuizDetail'>>();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [imageUri, setImageUri] = useState<string>('');

  const memoryId = route.params.memoryId;

  const {data, isLoading} = useQuery({
    queryKey: ['getQuizzesQuizanswerMemoryId', memoryId],
    queryFn: async () => {
      return getQuizzesQuizanswerMemoryId(memoryId);
    },
  });

  const memoryData = data?.data;

  useEffect(() => {
    if (memoryData) {
      setImageUri(Config.API_BASE_URL + '/' + memoryData.memoryImg);
    } else {
      setImageUri(DEFAULT_IMAGE);
    }
  }, [memoryData]);

  if (!memoryData || isLoading) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="#fff" barStyle="dark-content" />
      <View
        style={{
          paddingHorizontal: 16,
        }}>
        <View>
          <Image source={{uri: imageUri}} style={styles.quizImage} />
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
          {`${memoryData?.memoryTitle}의`}
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
          {memoryData.quizzes.map((quiz, index) => {
            return (
              <QuizDetailCard
                key={quiz.quizId}
                index={index}
                quiz={quiz.quizQuestion}
                answer={quiz.userAnswer}
                isCorrect={quiz.isCorrect}
                isDummy={quiz.isDummy}
                trial={quiz.quizCompletionState}
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
