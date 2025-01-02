import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  Req,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "./user.service.js";
import { RegistryDto } from "./dto/user.dto.js";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard.js";
import { Public } from "../../../constants/index.js";

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
