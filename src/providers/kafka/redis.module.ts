import { DynamicModule, Provider } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Redis } from "ioredis";

export class RedisModule {
  static forRootAsync(): DynamicModule {
    const factoryProvider = createClient();
    return {
      global: true,
      module: RedisModule,
      providers: [factoryProvider],
      exports: [factoryProvider],
    };
  }
}

function createClient(): Provider {
  return {
    provide: Redis,
    useFactory: (config: ConfigService): Redis => {
      const host = config.get<string>("REDIS_HOST");
      const port = Number(config.get<string>("REDIS_PORT"));
      return new Redis({
        host,
        port,
      });
    },
    inject: [ConfigService],
  };
}
