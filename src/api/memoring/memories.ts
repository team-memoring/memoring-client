import {AxiosResponse} from 'axios';
import {
  GetMemoriesMembersResponse,
  PostMemoriesResponse,
  UpdateMemory,
} from '../../lib/types/memories';
import {getToken} from '../../utils/storage';
import apiClient from './apiClient';
import {Memory} from '../../lib/types/memories';

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

export const getMemories = async (): Promise<{data: Memory[]}> => {
  return apiClient.get('/api/v1/memories/entirememories');
};

export const getMemoriesSpecificmemoryMemoryId = async (memoryId: number) => {
  return apiClient(`/api/v1/memories/specificmemory/${memoryId}`);
};

export const patchMemoriesMemoryId = async (
  memoryId: number,
  body: UpdateMemory,
): Promise<UpdateMemory> => {
  return apiClient.patch(`api/v1/memories/${memoryId}`, body);
};
