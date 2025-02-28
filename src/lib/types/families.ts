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

export interface PostFamiliesCodeResponse {
  familyId: number;
  familyName: string;
}

export interface GetFamiliesFamilyIdResponse {
  familyId: number;
  familyName: string;
  familyCode: string;
}
