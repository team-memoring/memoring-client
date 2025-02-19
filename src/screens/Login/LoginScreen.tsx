import React, {useEffect} from 'react';
import {View, StyleSheet, StatusBar, Alert, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomText from '../../components/shared/CustomText';

import Logo from '../../assets/icons/logo.svg';

import Kakao from '../../assets/icons/kakao.svg';
import {fetchKakaoProfile, signInWithKakao} from '../../api/kakao';
import {
  saveKakaoAccessToken,
  saveRefreshToken,
  saveToken,
  saveUser,
} from '../../utils/storage';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Character from '../../components/shared/Character';
import {postAuthLogin} from '../../api/memoring/auth';

const LoginScreen = (): React.JSX.Element => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleKakaoLogin = async () => {
    try {
      const kakaoAccessToken = await signInWithKakao();
      if (!kakaoAccessToken) {
        Alert.alert('로그인 실패', '카카오 로그인 중 오류가 발생했습니다.');
        return;
      }
      console.log(kakaoAccessToken);

      const response = await postAuthLogin(kakaoAccessToken);
      const {access_token, refresh_token} = response.data;

      await saveKakaoAccessToken(kakaoAccessToken);
      await saveToken(access_token);
      await saveRefreshToken(refresh_token);

      const kakaoProfile = await fetchKakaoProfile();
      await saveUser(kakaoProfile);

      navigation.navigate('LoginSelect');
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('로그인 실패', '다시 시도해주세요.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="#f9ebe4"
        barStyle="dark-content"
      />
      <View style={styles.content}>
        <View>
          <Logo width={120} height={24} />
        </View>
        <CustomText
          weight="ExtraBold"
          style={{fontSize: 28, marginTop: 8, color: '#222225'}}>
          반갑습니다,
        </CustomText>
        <CustomText weight="ExtraBold" style={{fontSize: 28, color: '#222225'}}>
          함께 추억으로 떠나봐요!
        </CustomText>
      </View>
      <Character type="close" />
      <View style={styles.centerContainer}>
        <Pressable
          style={({pressed}) => [
            styles.kakaoLoginButton,
            {opacity: pressed ? 0.5 : 1},
          ]}
          onPress={handleKakaoLogin}>
          <Kakao width={24} height={24} />
          <CustomText
            weight="ExtraBold"
            style={{fontSize: 20, color: '#fff', marginLeft: 8}}>
            카카오로 로그인
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
    marginTop: 160,
  },
  characterContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -430,
    alignItems: 'center',
    overflow: 'hidden',
  },
  centerContainer: {
    position: 'absolute',
    bottom: 36,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  kakaoLoginButton: {
    width: 361,
    height: 56,
    backgroundColor: '#222225',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default LoginScreen;
