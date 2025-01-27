import {KakaoProfile, getProfile} from '@react-native-seoul/kakao-login';

export const fetchKakaoProfile = async (): Promise<any> => {
  try {
    const profile: KakaoProfile = await getProfile();

    return profile;
  } catch (err) {
    throw err;
  }
};
