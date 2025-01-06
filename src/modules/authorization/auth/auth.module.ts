import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { UserModule } from "@modules/authorization/user/user.module";
import { UserService } from "@modules/authorization/user/user.service";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./strategies/local.strategy";

@Module({
  imports: [UserModule, PassportModule],
  // LocalStrategy for login, JwtStrategy for others
  providers: [AuthService, LocalStrategy, UserService, JwtService],
  controllers: [AuthController],
  exports: [AuthService, UserService, JwtService],
})
export class AuthModule {}
