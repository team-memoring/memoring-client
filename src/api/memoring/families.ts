import {AxiosResponse} from 'axios';
import apiClient from './apiClient';
import {
  PostFamiliesCodeResponse,
  GetFamiliesFamilyIdResponse,
  PostFamiliesRequestBody,
  PostFamiliesResponse,
} from '../../lib/types/families';

export const postFamilies = async (
  body: PostFamiliesRequestBody,
): Promise<AxiosResponse<PostFamiliesResponse>> => {
  return apiClient.post('/api/v1/families', body);
};

export const getFamiliesFamilyId = async (
  familyId: number,
): Promise<AxiosResponse<GetFamiliesFamilyIdResponse>> => {
  return apiClient.get(`/api/v1/families/${familyId}`);
};

export const postFamiliesCode = async (
  familyCode: string,
): Promise<AxiosResponse<PostFamiliesCodeResponse>> => {
  return apiClient.post('/api/v1/families/code', {familyCode});
};
