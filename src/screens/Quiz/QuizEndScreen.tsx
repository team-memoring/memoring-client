import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, Animated, View, Platform} from 'react-native';
import {CustomText, Character} from '../../components/shared';
import {SafeAreaView} from 'react-native-safe-area-context';
import {GestureHandlerRootView, Pressable} from 'react-native-gesture-handler';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CharacterType} from '../../components/shared/Character';
import {RouteProp, useRoute} from '@react-navigation/native';

import CelebrateAnimation from '../../components/shared/CelebrateAnimation';

type QuizEndScreenParams = {
  title: string;
};

type QuizEndScreenRouteProp = RouteProp<
  {QuizEnd: QuizEndScreenParams},
  'QuizEnd'
>;

const QuizEndScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute<QuizEndScreenRouteProp>();
  const title = route.params?.title;

  const [characterType, setCharacterType] = useState<CharacterType>('happy');

  const animatedTranslateY = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    Animated.spring(animatedTranslateY, {
      toValue: -80,
      useNativeDriver: true,
    }).start();
  });

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.container}>
        <CustomText
          weight="ExtraBold"
          style={{
            fontSize: 32,
            color: '#222225',
            paddingTop: 184,
            paddingHorizontal: 38,
            textAlign: 'center',
          }}>
          "{title}"의{'\n'}추억 여행을 완료했어요!
        </CustomText>
        <Character
          type={characterType}
          animatedTransformValue={animatedTranslateY}
        />
        <CelebrateAnimation />
        <View style={[styles.nextButtonWrapper]}>
          <Pressable
            onPress={() => navigation.navigate('MainheroSelect')}
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
              완료하기
            </CustomText>
          </Pressable>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9ebe4',
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

export default QuizEndScreen;
