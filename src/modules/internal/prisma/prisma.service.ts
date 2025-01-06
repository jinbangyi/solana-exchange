import { Injectable, Logger, OnModuleInit, Scope } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaClient } from "@prisma/client";
import assert from "assert";

import { LoggerService } from "@modules/internal/logger/logger.service";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  static ConnectionLimitFlags = "connection_limit=20&pool_timeout=15";

  constructor(
    private readonly config: ConfigService,
    private readonly logger: LoggerService,
  ) {
    const separator = `${process.env.DATABASE_URL}`.includes("?") ? "&" : "?";
    super({
      datasources: {
        db: {
          url: `${config.get<string>("DATABASE_URL")}${separator}${PrismaService.ConnectionLimitFlags}`,
        },
      },
    });

    this.logger.setContext(PrismaService.name);
  }

  async onModuleInit() {
    const source = this.config.get<string>("DATABASE_URL");
    assert(source, "DATABASE_URL is not defined");

    const maskedSource = `${source.slice(0, 15)}*****${source.slice(-10)}`;
    this.logger.debug(
      `Initialized: ${maskedSource}?${PrismaService.ConnectionLimitFlags}`,
    );
    await this.$connect();
    this.logger.log(`Connected to database`);
  }
}
