import { Body, Controller, Get, Logger, Post } from "@nestjs/common";

import { AppService } from "./app.service";
import { LoggerService } from "./modules/internal/logger/logger.service";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext("AppController");
  }

  @Get("/")
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("utils/log-body")
  logBody(@Body() body: any) {
    this.logger.log("log-body: %j", body);
  }
}
