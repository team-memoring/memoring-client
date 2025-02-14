import {IMemory} from './model/i-memory';

export const memberHomeMemoryDummy = [
  {
    id: 1,
    title: '즐거운 생일',
    creator: '천민규',
    totalQuizCount: 5,
    solvedQuizCount: 1,
    createdAt: new Date(),
    status: '풀이 중',
  },

  {
    id: 2,
    title: '베트남 여행',
    creator: '박현빈',
    totalQuizCount: 5,
    solvedQuizCount: 2,
    createdAt: new Date(),
    status: '풀이 중',
  },

  {
    id: 3,
    title: '한강 나들이',
    creator: '고윤재',
    totalQuizCount: 5,
    solvedQuizCount: 5,
    createdAt: new Date(),
    status: '풀이 완료',
  },

  {
    id: 4,
    title: '윤재 돌잔치',
    creator: '강지원',
    totalQuizCount: 5,
    solvedQuizCount: 0,
    createdAt: new Date(),
    status: '풀이 전',
  },

  {
    id: 5,
    title: '규호 군입대',
    creator: '이규호',
    totalQuizCount: 5,
    solvedQuizCount: 0,
    createdAt: new Date(),
    status: '풀이 전',
  },
] as IMemory[];
