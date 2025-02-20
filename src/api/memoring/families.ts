import {AxiosResponse} from 'axios';
import apiClient from './apiClient';
import {
  PostFamiliesRequestBody,
  PostFamiliesResponse,
} from '../../lib/types/families';

export const postFamilies = async (
  body: PostFamiliesRequestBody,
): Promise<AxiosResponse<PostFamiliesResponse>> => {
  return apiClient.post('/api/v1/families', body);
};
