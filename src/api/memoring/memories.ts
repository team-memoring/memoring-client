import {AxiosResponse} from 'axios';
import {
  GetMemoriesMembersResponse,
  PostMemoriesResponse,
} from '../../lib/types/memories';
import {getToken} from '../../utils/storage';
import apiClient from './apiClient';

export const getMemoriesMembers = async (): Promise<
  AxiosResponse<GetMemoriesMembersResponse>
> => {
  return apiClient.get('/api/v1/memories/members');
};

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
