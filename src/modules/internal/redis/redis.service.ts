import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Redis } from "ioredis";

import { LoggerService } from "@modules/internal/logger/logger.service";

@Injectable()
export class RedisService extends Redis implements OnModuleInit {
  constructor(
    private readonly nestConfig: ConfigService,
    private readonly logger: LoggerService,
  ) {
    super({
      host: nestConfig.get<string>("REDIS_HOST"),
      port: Number(nestConfig.get<string>("REDIS_PORT")),
      db: Number(nestConfig.get<string>("REDIS_DB")),
      password: nestConfig.get<string>("REDIS_PASSWORD"),
      lazyConnect: true,
    });

    this.logger.setContext(RedisService.name);
  }

  // throw if redis connection failed
  async onModuleInit() {
    this.logger.debug(`Connecting to Redis...`);
    await this.connect();
    this.logger.log(`Connected to Redis`);
  }
}
