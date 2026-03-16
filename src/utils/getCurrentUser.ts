import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../types/common';

export function getCurrentUser(): JwtPayload | null {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decoded = jwtDecode<JwtPayload>(token);

    if (!decoded.exp) return null;

    const now = Date.now() / 1000;

    if (decoded.exp < now) {
      localStorage.removeItem('token');
      return null;
    }

    return decoded;
  } catch {
    return null;
  }
}