export interface GetMembersResponseElement {
  memberId: number;
  memberRole: number;
  memberName: string;
  isMain: boolean;
  familyId: number;
}

export interface MainInfo {
  memberId: number;
  memberRole: 'string';
  memberName: 'string';
  isMain: boolean;
  familyId: number;
}

export type GetMembersResponse = GetMembersResponseElement[];
