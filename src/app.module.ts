import { MiddlewareConsumer, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DevtoolsModule } from "@nestjs/devtools-integration";

import { RedisModule } from "@modules/internal/redis/redis.module";
import { OrderbookModule } from "@modules/orderbook/orderbook.module";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { RUN_ENV } from "./constants/index";
import { ApiKeyAuthMiddleware } from "./middleware/apikey-auth.middleware";
import { LoggingMiddleware } from "./middleware/logging.middleware";
import { ApiKeyModule } from "./modules/authorization/apikey/apikey.module";
import { AuthModule } from "./modules/authorization/auth/auth.module";
import { UserModule } from "./modules/authorization/user/user.module";
import { ExchangeModule } from "./modules/exchange/exchange.module";
import { LoggerModule } from "./modules/internal/logger/logger.module";
import { PrismaModule } from "./modules/internal/prisma/prisma.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`env/.${RUN_ENV}.env`],
      isGlobal: true,
    }),
    LoggerModule,

    RedisModule,
    PrismaModule,

    // DevtoolsModule.register({
    //   http: RUN_ENV === "local",
    // }),

    UserModule,
    AuthModule,
    ApiKeyModule,

    // ExchangeModule,
    OrderbookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes("*");
    consumer.apply(ApiKeyAuthMiddleware).forRoutes("/api/v1/market/*"); // 应用到所有路由
  }
}
