export interface GetMembersResponseElement {
  memberId: number;
  memberRole: number;
  memberName: string;
  isMain: boolean;
  familyId: number;
}

export type GetMembersResponse = GetMembersResponseElement[];
