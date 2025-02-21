import {AxiosResponse} from 'axios';
import {GetQuizzesProgressResponse} from '../../lib/types/quizzes';
import apiClient from './apiClient';

export const getQuizzes = async (memoryId: number) => {
  return apiClient.get(`/api/v1/events/memory/${memoryId}`, {timeout: 600000});
};

export const postQuizzes = async (quizData: any) => {
  return apiClient.post(`/api/v1/quizzes/quizupload`, quizData);
};

export const getQuizzesProgress = async (): Promise<
  AxiosResponse<GetQuizzesProgressResponse>
> => apiClient.get(`/api/v1/quizzes/progress`);

export const getQuizzesShowquizMemoryId = async (memoryId: number) => {
  return apiClient.get(`/api/v1/quizzes/showquiz/${memoryId}`);
};

export const patchQuizzedUpdateQuizId = async (
  quizId: number,
  choice: string,
) => {
  return apiClient.patch(`/api/v1/quizzes/update`, null, {
    params: {
      quiz_id: quizId,
      user_ans: choice,
    },
  });
};
