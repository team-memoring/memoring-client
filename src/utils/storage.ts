import AsyncStorage from '@react-native-async-storage/async-storage';
import {KakaoProfile} from '@react-native-seoul/kakao-login';

// Access Token 저장
export const saveToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem('access_token', token);
  } catch (err) {
    console.error('토큰 저장 에러:', err);
  }
};

// Access Token 가져오기
export const getToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem('access_token');
    return token;
  } catch (err) {
    console.error('토큰 불러오기 에러:', err);
    return null;
  }
};

// Access Token 삭제
export const removeToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('access_token');
  } catch (err) {
    console.error('토큰 삭제 에러:', err);
  }
};

export const saveUser = async (user: KakaoProfile) => {
  await AsyncStorage.setItem('user', JSON.stringify(user));
};

export const getUser = async () => {
  const user = await AsyncStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};
