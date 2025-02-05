import {Platform, Pressable, StatusBar, StyleSheet, View} from 'react-native';
import {Character, CustomText, Header} from '../../components/shared';
import {SafeAreaView} from 'react-native-safe-area-context';
import Share from 'react-native-share';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const OnboardingInviteScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  // TODO: change to api call
  const familyName = '테스트';

  const shareMessage = async (code: string) => {
    try {
      await Share.open({
        message: `가족 공간 초대 코드: ${code}\n아래 링크에서 가입하세요!`,
        url: `memoring://invite/family?code=${code}`,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const handleStart = () => {
    navigation.navigate('MemberHome');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="#f9ebe4"
        barStyle="dark-content"
      />
      <Header />
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
              {`'${familyName}'`}
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
                주인공
              </CustomText>
              <CustomText weight="ExtraBold" style={styles.number}>
                145286
              </CustomText>
            </View>
            <Pressable
              style={styles.shareButton}
              onPress={() => shareMessage('145286')}>
              <CustomText
                weight="ExtraBold"
                style={{fontSize: 16, color: '#555558'}}>
                공유하기
              </CustomText>
            </Pressable>
          </View>
          <View style={styles.spacer} />
          <View style={styles.button}>
            <View style={styles.textContainer}>
              <CustomText weight="ExtraBold" style={styles.select}>
                가족 구성원
              </CustomText>
              <CustomText weight="ExtraBold" style={styles.number}>
                663258
              </CustomText>
            </View>
            <Pressable
              style={styles.shareButton}
              onPress={() => shareMessage('663258')}>
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
          onPress={handleStart}
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
            시작하기
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
    padding: 16,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 34.5,
  },
  spacer: {
    width: 12,
  },
  select: {
    fontSize: 18,
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
  },
});

export default OnboardingInviteScreen;
