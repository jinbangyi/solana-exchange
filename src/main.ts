import './env.js';

import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    cors: {
      origin: '*',
      credentials: true,
    },
  });

  app.setGlobalPrefix('/api', {
    exclude: ['/health', '/'],
  });
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // 开启请求参数校验
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: (errors) => {
        throw errors[0];
      },
    }),
  );

  // response 格式转换
  app.useGlobalInterceptors(app.get(WINSTON_MODULE_PROVIDER));
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true, limit: '10mb' }));

  // 启用 shutdown hooks
  app.enableShutdownHooks();

  const config = app.get(ConfigService);
  const listenPort = Number(config.get<string>('LISTEN_PORT'));
  await app.listen(listenPort);
}
bootstrap();
