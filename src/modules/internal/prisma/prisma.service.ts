import { Injectable, OnModuleInit, Logger, Scope } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaClient } from "@prisma/client";
import assert from "assert";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  static ConnectionLimitFlags = "connection_limit=20&pool_timeout=15";

  constructor(private readonly config: ConfigService) {
    const separator = `${process.env.DATABASE_URL}`.includes("?") ? "&" : "?";
    super({
      datasources: {
        db: {
          url: `${config.get<string>("DATABASE_URL")}${separator}${PrismaService.ConnectionLimitFlags}`,
        },
      },
    });
  }

  async onModuleInit() {
    const logger = new Logger("PrismaService");
    const source = this.config.get<string>("DATABASE_URL");
    assert(source, "DATABASE_URL is not defined");

    const maskedSource = `${source.slice(0, 15)}*****${source.slice(-10)}`;
    logger.log(
      `Initialized: ${maskedSource}?${PrismaService.ConnectionLimitFlags}`,
    );
    await this.$connect();
    logger.log(`Connected to database`);
  }
}
