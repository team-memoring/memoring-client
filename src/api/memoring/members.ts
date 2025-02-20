import apiClient from './apiClient';
import {AxiosResponse} from 'axios';
import {GetMembersResponse} from '../../lib/types/members';

export const getMembers = async (): Promise<
  AxiosResponse<GetMembersResponse>
> => {
  return apiClient.get('/api/v1/members');
};
