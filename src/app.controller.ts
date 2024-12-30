import { Body, Controller, Get, Post } from '@nestjs/common';
import { Logger } from 'winston';
import { AppService } from './app.service.js';
import { InjectLogger } from './providers/logger/logger.decorator.js';

@Controller()
export class AppController {
  constructor(
    @InjectLogger() private logger: Logger,
    private readonly appService: AppService,
  ) {}

  @Get('/')
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('utils/log-body')
  logBody(@Body() body: any) {
    this.logger.info('log-body: %j', body);
  }
}
