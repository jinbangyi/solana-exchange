export interface UserEntity {
  uuid: string;
  username: string;
  lastLoginAt: Date;
  role: string;
  isAdmin: boolean;
}
