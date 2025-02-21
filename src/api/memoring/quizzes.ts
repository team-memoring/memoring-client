import QuizDetailCard from '../../components/Member/QuizDetail/QuizDetailCard';
import apiClient from './apiClient';

export const getQuizzes = async (memoryId: number) => {
  return apiClient.get(`/api/v1/events/memory/${memoryId}`, {timeout: 600000});
};

export const postQuizzes = async (quizData: any) => {
  return apiClient.post(`/api/v1/quizzes/quizupload`, quizData);
};

export const getQuizzesShowquizMemoryId = async (memoryId: number) => {
  return apiClient.get(`/api/v1/quizzes/showquiz/${memoryId}`);
};

export const patchQuizzedUpdateQuizId = async (
  quizId: number,
  choice: string,
) => {
  return apiClient.patch(`/api/v1/quizzes/update/${quizId}?user_ans=${choice}`);
};
