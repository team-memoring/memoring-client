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

export interface SpecificMemory {
  memory_id: number;
  user_id: number;
  family_id: number;
  memory_title: string;
  memory_upload_time: string;
  memory_img: string;
  is_used: number;
}

export interface UpdateMemory {
  memory_title: string;
  memory_upload_time: string;
  is_used: number;
  memory_img: string;
}
