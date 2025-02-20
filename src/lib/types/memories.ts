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

export interface Memory {
  memory_title: string;
  memory_img: string;
  memory_id: number;
  is_used: number;
}
