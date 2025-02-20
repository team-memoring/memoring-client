interface PostFamiliesRequestBodyMembers {
  memberName: string;
  memberRole: string;
  isMain: boolean;
}

export interface PostFamiliesRequestBody {
  familyName: string;
  members: PostFamiliesRequestBodyMembers[];
}

export interface PostFamiliesResponse {
  familyId: number;
  familyName: string;
  familyCode: string;
}
