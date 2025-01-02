import { Module } from "@nestjs/common";
import { UserService } from "./user.service.js";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "../auth/strategies/jwt.strategy.js";
import { UserController } from "./user.controller.js";
import { jwtConstants } from "../../../constants/secrets.js";

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
