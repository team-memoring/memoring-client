import apiClient from './apiClient';

export const postAuthRefresh = async (refreshToken: string) => {
  return apiClient.post('/api/v1/auth/refresh', {refresh_token: refreshToken});
};

export const postAuthLogin = async (kakaoAccessToken: string) => {
  return apiClient.post('/api/v1/auth/login', {
    access_token: kakaoAccessToken,
  });
};
