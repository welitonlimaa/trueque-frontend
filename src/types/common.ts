export type SelectOption = {
  code: string;
  name: string;
};

export type JwtPayload = {
  sub: string;
  email: string;
  userId: string;
  exp: number;
};