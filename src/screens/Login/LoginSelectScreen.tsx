import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, StatusBar, Pressable, Animated} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Character from '../../assets/icons/character.svg';
import CustomText from '../../components/shared/CustomText';
import Header from '../../components/shared/Header';

import Codes from '../../assets/icons/code.svg';
import Pencil from '../../assets/icons/pencil.svg';

import {getUser} from '../../utils/storage';

const LoginSelectScreen = (): React.JSX.Element => {
  const [username, setUsername] = React.useState<string | null>(null);

  const animationValue = useRef(new Animated.Value(-430)).current;

  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: -550, // 캐릭터 최종 위치
      duration: 1200, // 지속 시간
      useNativeDriver: false,
    }).start();
  }, [animationValue]);

  useEffect(() => {
    const loadUsername = async () => {
      const user = await getUser();

      if (user) {
        setUsername(user.nickname);
        console.log('user:', user);
      }
    };

    loadUsername();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="#f9ebe4"
        barStyle="dark-content"
      />
      <View>
        <Header />
        <View style={styles.text}>
          <CustomText
            weight="ExtraBold"
            style={{fontSize: 28, marginTop: 8, color: '#222225'}}>
            {`안녕하세요 ${username}님,`}
          </CustomText>
          <CustomText
            weight="ExtraBold"
            style={{fontSize: 28, color: '#222225'}}>
            시작해볼까요?
          </CustomText>
        </View>
        <View style={[styles.buttonContainer]}>
          <Pressable style={[styles.button]}>
            <Pencil width={24} height={24} />
            <CustomText
              weight="ExtraBold"
              style={{fontSize: 20, marginTop: 12, color: '#222225'}}>
              우리가족 만들기
            </CustomText>
            <CustomText
              weight="Bold"
              style={{fontSize: 16, marginTop: 4, color: '#565656'}}>
              새롭게 등록할게요
            </CustomText>
          </Pressable>
          <View style={styles.spacer} />
          <Pressable style={[styles.button]}>
            <Codes width={24} height={24} />
            <CustomText
              weight="ExtraBold"
              style={{fontSize: 20, marginTop: 12, color: '#222225'}}>
              코드 등록하기
            </CustomText>
            <CustomText
              weight="Bold"
              style={{fontSize: 16, marginTop: 4, color: '#565656'}}>
              이미 코드를 받았어요
            </CustomText>
          </Pressable>
        </View>
      </View>

      <Animated.View
        style={[styles.characterContainer, {bottom: animationValue}]}>
        <Character width={768} height={768} />
      </Animated.View>
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
    paddingBottom: 12,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 36,
    paddingHorizontal: 16,
  },
  spacer: {
    width: 12,
  },
  characterContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    overflow: 'hidden',
  },
});

export default LoginSelectScreen;
