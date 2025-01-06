import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { HeaderAPIKeyStrategy } from "passport-headerapikey";

import { AuthService } from "@modules/authorization/auth/auth.service";

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy) {
  constructor(private readonly authService: AuthService) {
    super(
      { header: "x-api-key", prefix: "" },
      true,
      (
        apikey: string,
        done: (err: Error | null, user?: Object, info?: Object) => void,
        req: Request,
      ) => {
        try {
          const user = authService.validateApiKey(apikey);
          return done(null, user);
        } catch (error) {
          if (error.code === "P2025") {
            done(new UnauthorizedException("Invalid API Key"));
          } else {
            done(error);
          }
        }
      },
    );
  }
}
