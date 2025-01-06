import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";

import { Public } from "@constants/index";
import { JwtAuthGuard } from "@modules/authorization/auth/guard/jwt-auth.guard";

import { RegistryDto } from "./dto/user.dto";
import { UserService } from "./user.service";

@UseGuards(JwtAuthGuard)
@Controller({
  path: "/user",
  version: "1",
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post("registry")
  async registry(@Body() registryDto: RegistryDto) {
    return this.userService.registry(registryDto);
  }

  // @Get('profile')
  // async getProfile(@Req() request: Request) {
  //   return this.userService.getUserEntityFromUser(this.userService.findOne(request.user));
  // }
}
