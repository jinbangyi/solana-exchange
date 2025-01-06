import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";

import { UserEntity } from "@modules/authorization/user/interfaces/types";

import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/auth.dto";
import { LocalAuthGuard } from "./guard/local-auth.guard";

@UseGuards(LocalAuthGuard)
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  signIn(@Request() req, @Body() signInDto: SignInDto) {
    const user: UserEntity = req.user;
    return this.authService.login(user);
  }

  @Post("logout")
  async logout(@Request() req) {
    return req.logout();
  }
}
