import {Platform, Pressable, StatusBar, StyleSheet, View} from 'react-native';
import {Character, CustomText, Header} from '../../components/shared';
import {SafeAreaView} from 'react-native-safe-area-context';
import Share from 'react-native-share';
import {
  ParamListBase,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type RootStackParamList = {
  OnboardingInvite: {familyId: number; familyName: string; familyCode: string};
};

const OnboardingInviteScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const route = useRoute<RouteProp<RootStackParamList, 'OnboardingInvite'>>();

  const {familyId, familyName, familyCode} = route.params;

  const shareMessage = async (code: string) => {
    try {
      await Share.open({
        message: `👨‍👩‍👧‍👦 '${familyName}' 가족 공간에 초대합니다! 🎉\n\n초대 코드: ${code}\n\n아래 링크를 눌러 함께하세요! 👇\nmemoring://invite/family?code=${code}`,
        url: `memoring://invite/family?code=${code}`,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <CustomText
              weight="ExtraBold"
              style={{fontSize: 28, marginTop: 8, color: '#CE5419'}}>
              {`'${familyName}' `}
            </CustomText>
            <CustomText
              weight="ExtraBold"
              style={{fontSize: 28, marginTop: 8, color: '#222225'}}>
              공간을
            </CustomText>
          </View>
          <CustomText
            weight="ExtraBold"
            style={{fontSize: 28, color: '#222225'}}>
            만들었어요!
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
          <View style={styles.button}>
            <View style={styles.textContainer}>
              <CustomText weight="ExtraBold" style={styles.select}>
                가족 코드
              </CustomText>
              <CustomText
                weight="ExtraBold"
                style={[styles.number, {width: '100%'}]}
                numberOfLines={1}
                ellipsizeMode="tail">
                {familyCode}
              </CustomText>
            </View>
            <Pressable
              style={styles.shareButton}
              onPress={() => shareMessage(familyCode)}>
              <CustomText
                weight="ExtraBold"
                style={{fontSize: 16, color: '#555558'}}>
                공유하기
              </CustomText>
            </Pressable>
          </View>
        </View>
      </View>
      <Character type="close" bottom={-550} />
      <View style={[styles.nextButtonWrapper, {backgroundColor: '#222225'}]}>
        <Pressable
          onPress={() => {
            navigation.navigate('OnboardingStart', {
              familyId,
            });
          }}
          style={[
            styles.nextButton,
            {paddingBottom: Platform.OS === 'ios' ? 52 : 24},
            {backgroundColor: '#222225'},
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
  button: {
    backgroundColor: '#fff',
    height: 221,
    flex: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginHorizontal: 29,
  },
  textContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 34.5,
  },
  select: {
    fontSize: 22,
    color: '#CE5419',
  },
  number: {
    fontSize: 32,
    color: '#222225',
    marginTop: 12,
  },
  shareButton: {
    paddingHorizontal: 20,
    paddingVertical: 13,
    backgroundColor: '#F0F0F3',
    borderRadius: 60,
    width: '100%',
    alignItems: 'center',
  },
});

export default OnboardingInviteScreen;
