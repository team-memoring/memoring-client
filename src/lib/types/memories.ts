export interface PostMemoriesResponse {
  memoryId: number;
}

export interface GetMemoriesMembersResponseElement {
  memoryId: number;
  memoryTitle: string;
  memoryUploadTime: string;
  totalQuizzes: number;
  completedQuizzes: number;
}

export type GetMemoriesMembersResponse = GetMemoriesMembersResponseElement[];
