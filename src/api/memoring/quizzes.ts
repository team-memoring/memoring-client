import apiClient from './apiClient';

export const getQuizzes = async (memoryId: number) => {
  return apiClient.get(`/api/v1/events/memory/${memoryId}`, {timeout: 600000});
};

export const postQuizzes = async (quizData: any) => {
  return apiClient.post(`/api/v1/quizzes/quizupload`, quizData);
};
