export interface JWTPayload {
  username: string;
  sub: string;
  role: string;
  lastLoginAt: Date;
  ts: number;
}
