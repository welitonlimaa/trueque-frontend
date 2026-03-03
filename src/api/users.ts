import client from './client';
import authClient from './authClient';
import type { UserResponseDTO } from '../types/api';
import { getCurrentUser } from '../utils/getCurrentUser';

export async function getUserById(id: string) {
  const jwt = getCurrentUser();

  if (jwt) {
    const res = await authClient.get<UserResponseDTO>(`/user/${id}`);
    return res.data;
  }

  const res = await client.get<UserResponseDTO>(`/user/${id}`);
  return res.data;
}

export async function updateUserData(
  id: string,
  data: Partial<UserResponseDTO>
) {
  const res = await authClient.put<UserResponseDTO>(
    `/user/${id}/data`,
    data
  );
  return res.data;
}

export async function updateUserPassword(
  id: string,
  data: { currentPassword: string; newPassword: string }
) {
  const res = await authClient.put<void>(
    `/user/${id}/password`,
    data
  );
  return res.data;
}

export async function deleteUser(id: string) {
  const res = await authClient.delete<void>(`/user/${id}`);
  return res.data;
}