import React, {useState} from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import PaginationHeader from '../../components/shared/PaginationHeader';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import OnboardingNameView from '../../components/Onboarding/OnboardingNameView';

import {FormProvider, useForm} from 'react-hook-form';
import {IFamily} from '../../lib/model/i-family';
import CustomText from '../../components/shared/CustomText';

const TOTAL_SETPS = 4;

const OnboardingCreateScreen = (): React.JSX.Element => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

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

  const [currentIndex, setCurrentIndex] = useState(0);

  const renderStepComponent = () => {
    switch (currentIndex) {
      case 0:
        return (
          <OnboardingNameView
            onNextPress={() => setCurrentIndex(prev => prev + 1)}
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
          //   onNext={() => setCurrentIndex(prev => prev + 1)}
          // />
        );
      case 3:
        return (
          <CustomText>초대하기</CustomText>
          // <OnboardingInviteView onNext={methods.handleSubmit(handleSubmit)} />
        );
      default:
        return null;
    }
  };

  return (
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
        {renderStepComponent()}
      </SafeAreaView>
    </FormProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9ebe4',
  },
  text: {
    alignItems: 'center',
    marginTop: 72,
  },
  characterContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -430,
    alignItems: 'center',
    overflow: 'hidden',
  },
});

export default OnboardingCreateScreen;
