import {
  Animated,
  Image,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {Character, CustomText, Header} from '../../components/shared';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useEffect, useRef, useState} from 'react';
import {
  ParamListBase,
  useNavigation,
  useRoute,
  RouteProp,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import CelebrateAnimation from '../../components/shared/CelebrateAnimation';
import defaultImage from '../../assets/graphics/default_image.png';
import defaultTitleImage from '../../assets/graphics/default_title_image.png';

import {Quiz} from '../../lib/types/quizzes';
import Config from 'react-native-config';
import {getMembersGetMain} from '../../api/memoring/members';
import {MainInfo} from '../../lib/types/members';

type RootStackParamList = {
  MemberQuizComplete: {data: Quiz[]; memoryTitle: string};
};

const MemberQuizCompleteScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute<RouteProp<RootStackParamList, 'MemberQuizComplete'>>();
  const {data, memoryTitle} = route.params;
  const quizzes = data || [];
  const animatedTranslateY = useRef(new Animated.Value(0)).current;
  const [mainName, setMainName] = useState<MainInfo>();
  console.log(mainName);

  const handleRegisterPress = () => {
    navigation.navigate('MemberHome');
  };

  useEffect(() => {
    Animated.spring(animatedTranslateY, {
      toValue: -120,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const nameData = await getMembersGetMain();
        console.log('nameData:', nameData);
        setMainName(nameData.data);
      } catch (error) {
        console.error('Error fetching memories:', error);
      }
    };

    fetchData();
  }, []);

  if (!mainName) return null;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="#fff" barStyle="dark-content" />
      <Header showDiaryLogo={false} />
      <View style={{alignItems: 'center', marginTop: 72}}>
        <CustomText weight="ExtraBold" style={styles.mainText}>
          {quizzes.length}개의 퀴즈를
        </CustomText>
        <CustomText weight="ExtraBold" style={styles.mainText}>
          {mainName.memberName}님에게 전달했어요
        </CustomText>
      </View>
      <View
        style={{
          paddingHorizontal: 38,
        }}>
        <View style={styles.quizCard}>
          <Image
            source={
              quizzes[0].imageUrl
                ? {uri: `${Config.API_BASE_URL}/${quizzes[0].imageUrl}`}
                : defaultTitleImage
            }
            style={{width: '100%', height: 165, borderRadius: 16}}
          />
          <View style={styles.quizCartTextContainer}>
            <CustomText
              weight="ExtraBold"
              style={{
                fontSize: 20,
                color: '#222225',
                lineHeight: 32,
              }}>
              {memoryTitle}
            </CustomText>
            <CustomText
              weight="ExtraBold"
              style={{
                fontSize: 16,
                color: '#939396',
                lineHeight: 24,
              }}>
              {quizzes.length}개의 퀴즈
            </CustomText>
          </View>
        </View>
      </View>
      <Character
        type="happy"
        bottom={-640}
        animatedTransformValue={animatedTranslateY}
      />
      <CelebrateAnimation />
      <View style={styles.nextButtonWrapper}>
        <Pressable
          onPress={() => {
            handleRegisterPress();
          }}
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
            완료하기
          </CustomText>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9ebe4',
  },
  mainText: {
    fontSize: 28,
    color: '#222225',
    lineHeight: 36,
  },
  quizCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    width: '100%',
    padding: 12,
    marginTop: 36,
  },
  quizCartTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
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

export default MemberQuizCompleteScreen;
