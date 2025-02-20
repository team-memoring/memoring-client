import {Platform, Pressable, StatusBar, StyleSheet, View} from 'react-native';
import {BackHeader, CustomText} from '../../components/shared';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ParamListBase, useNavigation, useRoute} from '@react-navigation/native';

import Logo from '../../assets/icons/logo.svg';
import {useState} from 'react';
import MemberLoadingCharacter from '../../components/Member/QuizGen/MemberLoadingCharacter';

import {RouteProp} from '@react-navigation/native';

type RootStackParamList = {
  MemberQuizGen: {memoryId: string; memoryNumber: number};
};

const MemberQuizGenScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'MemberQuizGen'>>();

  const {memoryId, memoryNumber} = route.params;

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [isCreating, setIsCreating] = useState(false);

  const isCreateDisabled = isCreating;

  const createRequest = async () => {
    // TODO: API 호출 처리
    setTimeout(() => {
      navigation.navigate('MemberQuizList');
    }, 8000);
  };

  const handelQuizCreate = async () => {
    setIsCreating(true);
    await createRequest();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="#f9ebe4"
        barStyle="dark-content"
      />
      <BackHeader
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.content}>
        <View>
          <Logo width={120} height={24} />
        </View>
        <CustomText
          weight="ExtraBold"
          style={{fontSize: 28, marginTop: 8, color: '#222225'}}>
          {`${memoryNumber}개의 이벤트로`}
        </CustomText>
        <CustomText weight="ExtraBold" style={{fontSize: 28, color: '#222225'}}>
          {isCreating
            ? '퀴즈를 만들고 있어요!'
            : '퀴즈를 만들 준비가 되었어요!'}
        </CustomText>
      </View>

      <MemberLoadingCharacter isLoading={isCreating} />

      <View
        style={[
          styles.nextButtonWrapper,
          {backgroundColor: isCreateDisabled ? '#939396' : '#222225'},
        ]}>
        <Pressable
          onPress={handelQuizCreate}
          disabled={isCreateDisabled}
          style={[
            styles.nextButton,
            {paddingBottom: Platform.OS === 'ios' ? 52 : 24},
            {backgroundColor: isCreateDisabled ? '#939396' : '#222225'},
          ]}>
          <CustomText
            weight="ExtraBold"
            style={{
              color: '#fff',
              fontSize: 20,
            }}>
            생성하기
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
  content: {
    flex: 1,
    alignItems: 'center',
    marginTop: 72,
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

export default MemberQuizGenScreen;
