import React, {useState} from 'react';
import {Platform, Pressable, StatusBar, StyleSheet, View} from 'react-native';
import {Character, CustomText, Header} from '../../components/shared';
import {SafeAreaView} from 'react-native-safe-area-context';
import Share from 'react-native-share';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const OnboardingStartScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [startEnabled, setStartEnabled] = useState(false);

  // TODO: change to api call
  const familyName = '규호네가족';

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    setStartEnabled(true);
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

        <View style={styles.buttonContainer}>
          {/* 주인공 버튼 */}
          <Pressable
            onPress={() => handleRoleSelect('주인공')}
            style={[
              styles.button,
              selectedRole === '주인공' && styles.selectedButton, // 선택된 버튼 스타일
            ]}>
            <View style={styles.textContainer}>
              <CustomText weight="ExtraBold" style={styles.title}>
                주인공
              </CustomText>
              <CustomText weight="Bold" style={styles.description}>
                가족의 주인공으로{'\n'}퀴즈를 풀어요
              </CustomText>
            </View>
          </Pressable>
          <View style={styles.spacer} />
          <Pressable
            onPress={() => handleRoleSelect('가족 구성원')}
            style={[
              styles.button,
              selectedRole === '가족 구성원' && styles.selectedButton,
            ]}>
            <View style={styles.textContainer}>
              <CustomText weight="ExtraBold" style={styles.title}>
                가족 구성원
              </CustomText>
              <CustomText weight="Bold" style={styles.description}>
                가족 구성원으로{'\n'}퀴즈를 만들어요
              </CustomText>
            </View>
          </Pressable>
        </View>
      </View>
      <Character
        type={selectedRole === '주인공' ? 'openLeft' : 'openRight'}
        bottom={-550}
      />
      <View
        style={[
          styles.nextButtonWrapper,
          {backgroundColor: startEnabled ? '#222225' : '#d3d3d3'}, // 버튼 활성화 여부
        ]}>
        <Pressable
          onPress={() => {
            selectedRole === '주인공'
              ? navigation.navigate('MainheroSelect')
              : navigation.navigate('MemberHome');
          }}
          style={[
            styles.nextButton,
            {paddingBottom: Platform.OS === 'ios' ? 52 : 24},
            {backgroundColor: startEnabled ? '#222225' : '#939396'},
          ]}
          disabled={!startEnabled}>
          <CustomText weight="ExtraBold" style={{color: '#fff', fontSize: 20}}>
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
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 36,
    flexDirection: 'row',
    justifyContent: 'center',
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
    borderWidth: 2,
    borderColor: '#fff',
  },
  selectedButton: {
    borderColor: '#CE5419',
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 34.5,
  },
  spacer: {
    width: 12,
  },
  title: {
    fontSize: 22,
    color: '#CE5419',
  },
  description: {
    fontSize: 16,
    color: '#222225',
    marginTop: 12,
    textAlign: 'center',
    lineHeight: 24,
  },
  shareButton: {
    paddingHorizontal: 20,
    paddingVertical: 13,
    backgroundColor: '#F0F0F3',
    borderRadius: 60,
  },
});

export default OnboardingStartScreen;
