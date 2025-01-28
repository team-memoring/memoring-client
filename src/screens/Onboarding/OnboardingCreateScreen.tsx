import React, {useState} from 'react';
import {StyleSheet, StatusBar, Animated, Platform, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import PaginationHeader from '../../components/shared/PaginationHeader';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import OnboardingNameView from '../../components/Onboarding/OnboardingNameView';

import {FormProvider, useForm} from 'react-hook-form';
import {IFamily} from '../../lib/model/i-family';
import CustomText from '../../components/shared/CustomText';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  Pressable,
  State,
} from 'react-native-gesture-handler';
import Character, {CharacterType} from '../../components/shared/Character';

const TOTAL_SETPS = 4;

const OnboardingCreateScreen = (): React.JSX.Element => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [characterType, setCharacterType] = useState<CharacterType>('close');

  const [currentIndex, setCurrentIndex] = useState(0);
  const [accessibleIndex, setAccessibleIndex] = useState(0);
  const isNextDisabled = !(currentIndex < accessibleIndex);

  const handleCharacterTypeChange = (type: CharacterType) => {
    setCharacterType(type);
  };

  const handleAccessibleIndexChange = (accessibleIndex: number) => {
    setAccessibleIndex(accessibleIndex);
  };

  const methods = useForm<IFamily>({
    defaultValues: {
      familyName: '',
      hero: {
        name: '',
        role: 'grandfather',
      },
      members: [
        {
          name: '',
          role: 'father',
        },
      ],
    },
  });

  const handleSubmit = (data: IFamily) => {
    console.log(data);
  };

  const translateX = new Animated.Value(0);

  const handleGestureEvent = Animated.event(
    [{nativeEvent: {translationX: translateX}}],
    {useNativeDriver: true},
  );

  const handleGestureStateChange = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      const {translationX} = event.nativeEvent;

      if (translationX < -50 && currentIndex < accessibleIndex) {
        // ✅ 오른쪽 스와이프 → accessibleIndex까지만 이동 가능
        setCurrentIndex(prev => prev + 1);
      } else if (translationX > 50 && currentIndex > 0) {
        // ✅ 왼쪽 스와이프 → 항상 허용
        setCurrentIndex(prev => prev - 1);
      }

      // 애니메이션 초기화
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  };

  const renderStepComponent = () => {
    switch (currentIndex) {
      case 0:
        return (
          <OnboardingNameView
            onCharacterTypeChange={handleCharacterTypeChange}
            onAccessibleIndexChange={handleAccessibleIndexChange}
          />
        );
      case 1:
        return (
          <CustomText>주인공</CustomText>
          // <OnboardingHeroView
          //   onNext={() => setCurrentIndex(prev => prev + 1)}
          // />
        );
      case 2:
        return (
          <CustomText>가족</CustomText>
          // <OnboardingFamilyView
          //   onNext={methods.handleSubmit(handleSubmit)}
          // />
        );
      default:
        return null;
    }
  };

  return (
    <GestureHandlerRootView>
      <FormProvider {...methods}>
        <SafeAreaView style={styles.container}>
          <StatusBar
            translucent
            backgroundColor="#f9ebe4"
            barStyle="dark-content"
          />
          <PaginationHeader
            currentIndex={currentIndex}
            totalSteps={TOTAL_SETPS}
            onBackPress={() => navigation.goBack()}
          />
          <Character type={characterType} />
          <View
            style={[
              styles.nextButtonWrapper,
              {backgroundColor: isNextDisabled ? '#939396' : '#222225'},
            ]}>
            <Pressable
              onPress={() => setCurrentIndex(prev => prev + 1)}
              disabled={isNextDisabled}
              style={[
                styles.nextButton,
                {paddingBottom: Platform.OS === 'ios' ? 52 : 24},
                {backgroundColor: isNextDisabled ? '#939396' : '#222225'},
              ]}>
              <CustomText
                weight="ExtraBold"
                style={{
                  color: '#fff',
                  fontSize: 20,
                }}>
                다음으로
              </CustomText>
            </Pressable>
          </View>

          <PanGestureHandler
            onGestureEvent={handleGestureEvent}
            onHandlerStateChange={handleGestureStateChange}>
            <Animated.View
              style={{
                transform: [{translateX}],
              }}>
              {renderStepComponent()}
            </Animated.View>
          </PanGestureHandler>
        </SafeAreaView>
      </FormProvider>
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
  },
  nextButton: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: Platform.OS === 'ios' ? 52 : 24,
  },
});

export default OnboardingCreateScreen;
