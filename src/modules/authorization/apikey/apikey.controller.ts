import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";

import { AuthService } from "@modules/authorization/auth/auth.service";
import { JwtAuthGuard } from "@modules/authorization/auth/guard/jwt-auth.guard";
import { UserEntity } from "@modules/authorization/user/interfaces/types";

import { ApiKeyService } from "./apikey.service";

@ApiBearerAuth("JWT-auth")
@UseGuards(JwtAuthGuard)
@Controller({
  path: "/apikey",
  version: "1",
})
export class ApiKeyController {
  constructor(
    private readonly apiKeyService: ApiKeyService,
    private readonly authService: AuthService,
  ) {}

  // create a new API key for user
  @Post()
  create(@Request() req) {
    const user: UserEntity = req.user;
    console.log("user", user);
    // TODO check user's plan
    // TODO check apikey not reach limit
    return this.apiKeyService.generateDefaultApiKey(user);
  }

  // @Patch(':id/regenerate')
  // regenerate(@Param('id') id: string) {
  //   return this.apiKeyService.regenerate(id);
  // }

  @Get()
  findAll(@Request() req) {
    const user: UserEntity = req.user;
    return this.apiKeyService.findAll(user);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.apiKeyService.findOne(id);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.apiKeyService.remove(id);
  // }
}
