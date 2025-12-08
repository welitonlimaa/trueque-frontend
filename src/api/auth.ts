import client from './client';
import type { LoginRequestDTO, AuthResponseDTO, UserDataRequestDTO } from '../types/api';


export async function login(data: LoginRequestDTO) {
const res = await client.post<AuthResponseDTO>('/auth/login', data);
return res.data;
}

export async function register(data: UserDataRequestDTO) {
const res = await client.post<AuthResponseDTO>('/user/register', data);
return res.data;
}