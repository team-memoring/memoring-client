// FIXME: This file should be changed to synced version with the backend model

export const familyRoleList = [
  'grandfather',
  'grandmother',
  'father',
  'mother',
  'son',
  'daughter',
  'granddaughter',
  'grandson',
  'relative',
] as const;

export type FamilyRole = (typeof familyRoleList)[number];

export const familyRoleMap: Record<FamilyRole, string> = {
  grandfather: '할아버지',
  grandmother: '할머니',
  father: '아빠',
  mother: '엄마',
  son: '아들',
  daughter: '딸',
  granddaughter: '손녀',
  grandson: '손자',
  relative: '친인척',
};

// const role: FamilyRole = 'grandfather';
// console.log(familyRoleMap[role]); // '할아버지' 출력

export interface IMember {
  name: string;
  nickname?: string;
  role: FamilyRole;
}

export interface IFamily {
  familyName: string;
  hero: IMember;
  members: IMember[];
}
