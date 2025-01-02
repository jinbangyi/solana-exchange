import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { UserService } from "@modules/authorization/user/user.service";
import { UserEntity } from "@modules/authorization/user/interfaces/types";
import { jwtConstants } from "@constants/secrets";

import { JWTPayload } from "./interfaces/types";

export function jwtPayloadToUserEntity(payload: JWTPayload): UserEntity {
  return {
    uuid: payload.sub,
    username: payload.username,
    role: payload.role,
    lastLoginAt: payload.lastLoginAt,
    isAdmin: payload.role === 'admin',
  };
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(user: UserEntity) {
    const payload: JWTPayload = {
      username: user.username,
      sub: user.uuid,
      role: user.role,
      lastLoginAt: user.lastLoginAt,
      ts: Date.now(),
    };

    return {
      access_token: this.jwtService.sign(payload, { secret: jwtConstants.secret }),
    };
  }

  async validateUser(username: string, pass: string): Promise<UserEntity> {
    const user = await this.userService.findOne(username);
    const hash = await this.userService.generatePasswordHash(pass, user.salt);
    if (user.password !== hash.hash) {
      throw new UnauthorizedException();
    }

    return this.userService.getUserEntityFromUser(user);
  }
}
