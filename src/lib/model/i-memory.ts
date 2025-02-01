// This file is temporary. It will be deleted when the actual API is connected.

export enum QuizStatus {
  NOT_STARTED = '풀이 전',
  IN_PROGRESS = '풀이 중',
  COMPLETED = '풀이 완료',
}

export interface IMemory {
  id: number;
  title: string;
  creator: string;
  totalQuizCount: number;
  solvedQuizCount: number;
  createdAt: Date;
  status: QuizStatus;
}
