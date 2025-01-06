import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from "@nestjs/common";
import * as passport from "passport";

@Injectable()
export class ApiKeyAuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    passport.authenticate(
      "headerapikey",
      { session: false },
      (err, user, info) => {
        // (err: Error | null, user?: Object, info?: Object) => void
        if (err || !user) {
          throw err;
        }
        req.user = user;
        next();
      },
    )(req, res, next);
  }
}
