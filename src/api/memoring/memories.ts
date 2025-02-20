import {AxiosResponse} from 'axios';
import {PostMemoriesResponse} from '../../lib/types/memories';
import {getToken} from '../../utils/storage';
import apiClient from './apiClient';

export const postMemories = async (
  formData: FormData,
): Promise<AxiosResponse<PostMemoriesResponse>> => {
  const token = await getToken();

  return apiClient.post('/api/v1/memories', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
};
