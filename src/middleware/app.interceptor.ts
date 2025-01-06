import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { RUN_ENV } from "@constants/index";

@Injectable()
export class ReqLoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger("HTTP_REQUEST");

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Extract request and response objects
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    // Record current timestamp
    const now = Date.now();

    // Determine if in production
    const isProduction = RUN_ENV === "prod";

    // Construct log message
    const logMessage =
      `METHOD - ${req.method} | URL - ${req.url} | ` +
      (isProduction
        ? ""
        : `QUERY - ${JSON.stringify(req.query)} | PARAMS - ${JSON.stringify(req.params)} | BODY - ${JSON.stringify(req.body)} `) +
      `${this.getColorizedStatusCode(res.statusCode)} ${Date.now() - now} ms`;

    // Handle the observable
    return next.handle().pipe(
      tap(() => {
        // Log request details on success
        req.url && this.logger.debug(logMessage);
      }),
      catchError((error) => {
        // Log request details on error and rethrow the error
        req.url && this.logger.warn(logMessage);
        throw error;
      }),
    );
  }

  private getColorizedStatusCode(statusCode: number): string {
    // ANSI escape codes for colorization
    const yellow = "\x1b[33m";
    const reset = "\x1b[0m";

    return `${yellow}${statusCode}${reset}`;
  }
}
