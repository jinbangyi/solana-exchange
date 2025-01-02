import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
} from "@nestjs/common";
import { AuthService } from "./auth.service.js";
import { LocalAuthGuard } from "./guard/local-auth.guard.js";
import { UserEntity } from "@modules/authorization/user/interfaces/types";
import { SignInDto } from "./dto/auth.dto.js";

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
