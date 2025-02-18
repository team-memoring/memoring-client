import {Platform, Pressable, StatusBar, StyleSheet, View} from 'react-native';
import {Character, CustomText, Header} from '../../components/shared';
import {SafeAreaView} from 'react-native-safe-area-context';
import CodeInput from '../../components/shared/CodeInput';
import {useEffect, useState} from 'react';
import {CharacterType} from '../../components/shared/Character';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const OnboardingCodeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [code, setCode] = useState<string[]>(Array(6).fill(''));
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const [isNextDisabled, setIsNextDisabled] = useState(true);

  const [characterType, setCharacterType] = useState<CharacterType>('close');

  const handleSubmit = () => {
    //TODO: API call 처리 (ex. 존재하지 않는 코드)
    // console.log('code:', code.join(''));
    if (false) {
      setIsError(true);
      setErrorText('존재하지 않는 코드입니다.');
      return;
    } else {
      setIsError(false);
      navigation.navigate('MainheroSelect');
      //TODO: Navigation 처리
    }
  };

  useEffect(() => {
    if (code.join('').length === 6) {
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
            6자리 코드를
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
          <CodeInput code={code} setCode={setCode} isError={isError} />
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
