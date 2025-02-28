export interface PatchUserUserIdResponse {
  kakaoId: number;
  familyId: number;
  memberId: number;
  role: number;
  userId: number;
}

export interface PatchUserUserIdRequestBody {
  role: number;
  memberId: number;
}
