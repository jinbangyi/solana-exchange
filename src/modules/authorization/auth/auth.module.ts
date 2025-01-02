import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtService } from "@nestjs/jwt";

import { UserModule } from "@modules/authorization/user/user.module";
import { UserService } from "@modules/authorization/user/user.service";

import { AuthService } from "./auth.service.js";
import { LocalStrategy } from "./strategies/local.strategy.js";
import { AuthController } from "./auth.controller.js";

@Module({
  imports: [UserModule, PassportModule],
  // LocalStrategy for login, JwtStrategy for others
  providers: [AuthService, LocalStrategy, UserService, JwtService],
  controllers: [AuthController],
  exports: [AuthService, UserService, JwtService],
})
export class AuthModule {}
