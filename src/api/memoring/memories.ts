import {Memory} from '../../lib/types/memories';
import apiClient from './apiClient';

export const getMemories = async (): Promise<{data: Memory[]}> => {
  return apiClient.get('/api/v1/memories/entirememories');
};
