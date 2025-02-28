import {login, logout, unlink} from '@react-native-seoul/kakao-login';

export const signInWithKakao = async (): Promise<string | null> => {
  try {
    const token = await login();
    return token.accessToken;
  } catch (err) {
    return null;
  }
};

export const signOutWithKakao = async (): Promise<string | null> => {
  try {
    const message = await logout();
    console.log('logout success', message);
    return message;
  } catch (err) {
    console.error('logout error', err);
    return null;
  }
};

export const unlinkKakao = async (): Promise<string | null> => {
  try {
    const message = await unlink();
    console.log('unlink success', message);
    return message;
  } catch (err) {
    console.error('unlink error', err);
    return null;
  }
};
