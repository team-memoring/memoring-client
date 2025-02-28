import {AxiosResponse} from 'axios';
import {GetAuthMeResponse} from '../../lib/types/auth';
import apiClient from './apiClient';

export const postAuthLogin = async (kakaoAccessToken: string) => {
  return apiClient.post('/api/v1/auth/login', {
    access_token: kakaoAccessToken,
  });
};

export const postAuthRefresh = async (refreshToken: string) => {
  return apiClient.post('/api/v1/auth/refresh', {refresh_token: refreshToken});
};

export const getAuthMe = async (): Promise<
  AxiosResponse<GetAuthMeResponse>
> => {
  return apiClient.get('/api/v1/auth/me');
};
