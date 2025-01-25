import {getProfile} from '@react-native-seoul/kakao-login';

export const fetchKakaoProfile = async (): Promise<any> => {
  try {
    const profile = await getProfile();
    console.log('profile', profile);
    return profile;
  } catch (err) {
    console.error('profile fetch error', err);
    throw err;
  }
};
