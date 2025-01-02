import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller.js";
import { AppService } from "./app.service.js";
import { ExchangeModule } from "./exchange/exchange.module.js";
import { RUN_ENV } from "./constants/index.js";
import { DevtoolsModule } from "@nestjs/devtools-integration";
import { LoggerModule } from "./modules/internal/logger/logger.module.js";
import { UserModule } from "./modules/authorization/user/user.module.js";
import { AuthModule } from "./modules/authorization/auth/auth.module.js";
import { ApiKeyModule } from "./modules/authorization/apikey/apikey.module.js";
import { PrismaModule } from "./modules/internal/prisma/prisma.module.js";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`env/.${RUN_ENV}.env`],
      isGlobal: true,
    }),
    LoggerModule,
    PrismaModule,

    // DevtoolsModule.register({
    //   http: RUN_ENV === "local",
    // }),

    UserModule,
    AuthModule,
    ApiKeyModule,

    // ExchangeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
