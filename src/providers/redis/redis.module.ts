import { Scope } from "@nestjs/common";
import { Injectable, OnModuleInit, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Redis } from "ioredis";

@Injectable({ scope: Scope.DEFAULT })
export class RedisService extends Redis implements OnModuleInit {
  constructor(config: ConfigService) {
    super({
      host: config.get<string>("REDIS_HOST"),
      port: Number(config.get<string>("REDIS_PORT")),
      db: Number(config.get<string>("REDIS_DB")),
    });
  }

  // throw if redis connection failed
  async onModuleInit() {
    const logger = new Logger("RedisService");
    logger.log(`Connecting to Redis...`);
    await this.connect();
    logger.log(`Connected to Redis`);
  }
}
