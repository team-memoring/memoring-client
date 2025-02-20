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
import {useEffect, useRef} from 'react';
import {
  ParamListBase,
  useNavigation,
  useRoute,
  RouteProp,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import CelebrateAnimation from '../../components/shared/CelebrateAnimation';

import {Quiz} from '../../lib/types/quizzes';

const DEFAUL_IMAGE = '/Users/kyuho/Downloads/dummy.png';

const MemberQuizCompleteScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute<RouteProp<{params: {data: Quiz[]}}>>();
  const quizzes = route.params?.data || [];
  const animatedTranslateY = useRef(new Animated.Value(0)).current;

  const REP_IMAGE = quizzes[0].imageUrl || DEFAUL_IMAGE;
  const handleRegisterPress = () => {
    navigation.navigate('MemberHome');
  };

  useEffect(() => {
    Animated.spring(animatedTranslateY, {
      toValue: -120,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="#fff" barStyle="dark-content" />
      <Header showDiaryLogo={false} />
      <View style={{alignItems: 'center', marginTop: 72}}>
        <CustomText weight="ExtraBold" style={styles.mainText}>
          5개의 퀴즈를
        </CustomText>
        <CustomText weight="ExtraBold" style={styles.mainText}>
          선옥님에게 전달했어요
        </CustomText>
      </View>
      <View
        style={{
          paddingHorizontal: 38,
        }}>
        <View style={styles.quizCard}>
          <Image
            source={{uri: REP_IMAGE}}
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
              아버지와의 관악산 등반
            </CustomText>
            <CustomText
              weight="ExtraBold"
              style={{
                fontSize: 16,
                color: '#939396',
                lineHeight: 24,
              }}>
              5개의 퀴즈
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
