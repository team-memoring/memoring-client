import {Platform, Pressable, StatusBar, StyleSheet, View} from 'react-native';
import {
  Character,
  CustomInput,
  CustomText,
  Header,
} from '../../components/shared';
import {SafeAreaView} from 'react-native-safe-area-context';

import {useEffect, useState} from 'react';
import {CharacterType} from '../../components/shared/Character';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {postFamiliesCode} from '../../api/memoring/families';
import {AxiosError} from 'axios';

const OnboardingCodeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [code, setCode] = useState<string>('');

  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const [isNextDisabled, setIsNextDisabled] = useState(true);

  const [characterType, setCharacterType] = useState<CharacterType>('close');

  const handleSubmit = async () => {
    try {
      const response = await postFamiliesCode(code);

      setIsError(false);
      navigation.navigate('OnboardingStart', {
        familyId: response.data.familyId,
      });
    } catch (error) {
      const _error = error as AxiosError;
      setIsError(true);

      if (_error.status === 404) {
        setErrorText('존재하지 않는 코드입니다.');
      } else {
        console.error('Error fetching family code:', _error);
        setErrorText('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  useEffect(() => {
    if (code.trim().length > 0) {
      setIsNextDisabled(false);
    } else {
      setIsNextDisabled(true);
    }

    setIsError(false);
  }, [code]);

  useEffect(() => {
    if (isError) {
      setCharacterType('sad');
    } else if (!isNextDisabled) {
      setCharacterType('close');
    } else {
      setCharacterType('open');
    }
  }, [isError, isNextDisabled]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="#f9ebe4"
        barStyle="dark-content"
      />
      <Header showDiaryLogo={false} />

      <View>
        <View style={styles.text}>
          <CustomText
            weight="ExtraBold"
            style={{fontSize: 28, marginTop: 8, color: '#222225'}}>
            가족 코드를
          </CustomText>
          <CustomText
            weight="ExtraBold"
            style={{fontSize: 28, color: '#222225'}}>
            입력하여 시작해보세요.
          </CustomText>
        </View>

        <View
          style={{
            width: '100%',
            paddingHorizontal: 16,
            marginTop: 36,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <CustomInput
            value={code}
            error={isError}
            placeholder="가족 코드를 입력해주세요."
            onChangeText={(code: string) => {
              setCode(code);
            }}
          />
        </View>
      </View>
      <Character type={characterType} />
      <View
        style={[
          styles.nextButtonWrapper,
          {backgroundColor: isNextDisabled ? '#939396' : '#222225'},
        ]}>
        <Pressable
          onPress={handleSubmit}
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
            시작하기
          </CustomText>
        </Pressable>
      </View>
      {isError && (
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CustomText
            weight="Bold"
            style={{
              color: '#CE5419',
              fontSize: 16,
              marginTop: 16,
            }}>
            {errorText}
          </CustomText>
        </View>
      )}
    </SafeAreaView>
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
  text: {
    alignItems: 'center',
    marginTop: 72,
  },
});

export default OnboardingCodeScreen;
