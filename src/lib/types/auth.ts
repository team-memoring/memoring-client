export interface GetAuthMeResponse {
  userId: number;
  kakaoId: number;
  familyId: number | null;
  memberId: number | null;
  role: number; // 0: 미정, 1: 구성원, 2: 주인공
}
