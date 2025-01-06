import { ValidationPipe, VersioningType } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { json, urlencoded } from "express";

import { AppModule } from "./app.module";
import { RUN_ENV } from "./constants/index";
import "./env";
import { ReqLoggingInterceptor } from "./middleware/app.interceptor";
import { LoggerService } from "./modules/internal/logger/logger.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    cors: {
      origin: "*",
      credentials: true,
    },
  });

  app.useLogger(new LoggerService());
  app.useGlobalInterceptors(new ReqLoggingInterceptor());

  app.setGlobalPrefix("/api", {
    exclude: ["/health", "/", "/swagger"],
  });
  app.enableVersioning({
    type: VersioningType.URI,
  });

  if (RUN_ENV === "dev" || RUN_ENV === "local") {
    // init swagger
    const swaggerConfig = new DocumentBuilder()
      .setTitle("Exchange")
      .setDescription("Solana orderbook wrapper for AMM")
      .setVersion("1.0")
      .addTag("exchange")
      .addBearerAuth(
        {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          name: "JWT",
          description: "Enter JWT token",
          in: "header",
        },
        "JWT-auth", // This is the key used to reference this security scheme
      )
      .addApiKey(
        {
          type: "apiKey",
          name: "x-api-key",
          in: "header",
          description: "Enter API Key",
        },
        "ApiKey-auth",
      )
      .build();
    const documentFactory = () =>
      SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup("swagger/api", app, documentFactory);
  }

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
  // app.useGlobalInterceptors(app.get(WINSTON_MODULE_PROVIDER));
  app.use(json({ limit: "10mb" }));
  app.use(urlencoded({ extended: true, limit: "10mb" }));

  // 启用 shutdown hooks
  app.enableShutdownHooks();

  const config = app.get(ConfigService);
  const listenPort = Number(config.get<string>("LISTEN_PORT"));
  await app.listen(listenPort);
}
bootstrap();
