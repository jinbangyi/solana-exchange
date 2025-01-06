import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { jwtConstants } from "@constants/secrets";
import { AuthModule } from "@modules/authorization/auth/auth.module";
import { AuthService } from "@modules/authorization/auth/auth.service";

import { ApiKeyController } from "./apikey.controller";
import { ApiKeyService } from "./apikey.service";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "60s" },
    }),

    AuthModule,
  ],
  controllers: [ApiKeyController],
  providers: [ApiKeyService, AuthService],
})
export class ApiKeyModule {}
