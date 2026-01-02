import { jwtDecode } from 'jwt-decode';

type JwtPayload = {
  sub: string;
  email: string;
  exp: number;
};

export function getCurrentUser() {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    return jwtDecode<JwtPayload>(token);
  } catch {
    return null;
  }
}
