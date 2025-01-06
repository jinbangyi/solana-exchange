import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private logger = new Logger("http-logger");
  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(`${req.method} ${req.originalUrl}`);
    this.logger.debug(
      `${JSON.stringify(req.body)} ${JSON.stringify(req.headers)}`,
    );
    res.on("finish", () => {
      this.logger.log(`Response Status: ${res.statusCode}`);
    });
    next();
  }
}
