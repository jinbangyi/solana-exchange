import { Module } from "@nestjs/common";
import { ApiKeyService } from "./apikey.service.js";
import { ApiKeyController } from "./apikey.controller.js";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "@constants/secrets";
import { AuthService } from "@modules/authorization/auth/auth.service";
import { AuthModule } from "@modules/authorization/auth/auth.module";

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
