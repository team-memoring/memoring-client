import {
  PatchUserUserIdRequestBody,
  PatchUserUserIdResponse,
} from '../../lib/types/user';
import apiClient from '../memoring/apiClient';

export const patchUserUserId = async (
  userId: number,
  body: PatchUserUserIdRequestBody,
): Promise<PatchUserUserIdResponse> => {
  return apiClient.patch(`/api/v1/users/${userId}`, body);
};
