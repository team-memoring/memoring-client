import {AxiosResponse} from 'axios';
import {
  GetQuizzesProgressResponse,
  GetQuizzesQuizanswerMemoryIdResponse,
} from '../../lib/types/quizzes';
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
  return apiClient.patch(`/api/v1/quizzes/update/${quizId}`, null, {
    params: {
      user_ans: choice,
    },
  });
};

export const getQuizzesQuizanswerMemoryId = async (
  memoryId: number,
): Promise<AxiosResponse<GetQuizzesQuizanswerMemoryIdResponse>> => {
  return apiClient.get(`/api/v1/quizzes/quizanswer/${memoryId}`);
};
