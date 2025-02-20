import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, StatusBar, Animated, Platform, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {FormProvider, useForm} from 'react-hook-form';
import {IFamily, familyRoleMap} from '../../lib/model/i-family';

import {
  GestureHandlerRootView,
  PanGestureHandler,
  Pressable,
  State,
} from 'react-native-gesture-handler';

import OnboardingNameView from '../../components/Onboarding/OnboardingNameView';
import OnboardingHeroView from '../../components/Onboarding/OnboardingHeroView';
import OnboardingFamilyView from '../../components/Onboarding/OnboardingFamilyView';

import {Character, CustomText, PaginationHeader} from '../../components/shared';
import {CharacterType} from '../../components/shared/Character';
import {postFamilies} from '../../api/memoring/families';
import {PostFamiliesRequestBody} from '../../lib/types/families';

const TOTAL_STEPS = 3;

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

  const handleSubmit = async (data: IFamily) => {
    try {
      let members = data.members.map(member => {
        return {
          memberName: member.name,
          memberRole: familyRoleMap[member.role],
          isMain: false,
        };
      });

      members.push({
        memberName: data.hero.name,
        memberRole: familyRoleMap[data.hero.role],
        isMain: true,
      });

      const body: PostFamiliesRequestBody = {
        familyName: data.familyName,
        members: members,
      };

      const response = await postFamilies(body);

      navigation.navigate('OnboardingInvite', {
        familyName: data.familyName,
        familyCode: response.data.familyCode,
      });
    } catch (error) {
      // TODO: 400일 시 이미 가족 존재, modal 띄우고 가족 코드 보여주기
      console.error('Error:', error);
    }
  };

  const handleNextPress = () => {
    if (currentIndex !== 2) {
      setCurrentIndex(prev => prev + 1);
    } else {
      methods.handleSubmit(
        data => {
          handleSubmit(data);
        },
        errors => {
          // TODO: 에러 처리
          console.log('Form validation failed!', errors);
        },
      )();
    }
  };

  const handleJumpPress = () => {
    methods.setValue('members', []);
    methods.handleSubmit(
      data => {
        handleSubmit(data);
      },
      errors => {
        // TODO: 에러 처리
        console.log('Form validation failed!', errors);
      },
    )();
  };

  const methods = useForm<IFamily>({
    defaultValues: {
      familyName: '',
      hero: {
        role: 'grandfather',
        name: '',
      },
      members: [
        {
          role: 'relative',
          name: '',
        },
      ],
    },
  });

  const translateX = new Animated.Value(0);

  const handleGestureEvent = Animated.event(
    [{nativeEvent: {translationX: translateX}}],
    {useNativeDriver: true},
  );

  const handleGestureStateChange = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      const {translationX} = event.nativeEvent;

      if (translationX < -50 && currentIndex < accessibleIndex) {
        // 오른쪽 스와이프 → accessibleIndex까지만 이동 가능
        if (currentIndex < TOTAL_STEPS - 1) {
          setCurrentIndex(prev => prev + 1);
        }
      } else if (translationX > 50 && currentIndex > 0) {
        //  왼쪽 스와이프 → 항상 허용
        setCurrentIndex(prev => prev - 1);
      }

      // 애니메이션 초기화
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  };

  const animatedTranslateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(animatedTranslateY, {
      toValue: currentIndex === 2 ? 120 : 0,
      useNativeDriver: true,
    }).start();
  }, [currentIndex]);

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
          <OnboardingHeroView
            onAccessibleIndexChange={handleAccessibleIndexChange}
          />
        );
      case 2:
        return (
          <OnboardingFamilyView
            onAccessibleIndexChange={handleAccessibleIndexChange}
          />
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
            totalSteps={TOTAL_STEPS}
            onBackPress={() => navigation.goBack()}
            onJumpPress={currentIndex === 2 ? handleJumpPress : undefined}
          />
          <Character
            type={characterType}
            animatedTransformValue={animatedTranslateY}
          />
          <View
            style={[
              styles.nextButtonWrapper,
              {backgroundColor: isNextDisabled ? '#939396' : '#222225'},
            ]}>
            <Pressable
              onPress={handleNextPress}
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
