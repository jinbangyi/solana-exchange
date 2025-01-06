import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { jwtConstants } from "@constants/secrets";
import { JwtStrategy } from "@modules/authorization/auth/strategies/jwt.strategy";

import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "60s" },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [UserService],
})
export class UserModule {}
