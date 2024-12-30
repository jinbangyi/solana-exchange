import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './providers/logger/logger.module';
import { ExchangeModule } from './exchange/exchange.module';
import { RUN_ENV } from './constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`env/.${RUN_ENV}.env`],
      isGlobal: true,
    }),
    LoggerModule,
    ExchangeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
