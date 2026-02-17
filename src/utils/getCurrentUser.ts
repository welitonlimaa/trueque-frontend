import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../types/common';

export function getCurrentUser() {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    return jwtDecode<JwtPayload>(token);
  } catch {
    return null;
  }
}
