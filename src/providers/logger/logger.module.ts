import { Global, Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import util from 'util';
import winston from 'winston';

@Global()
@Module({
  imports: [
    WinstonModule.forRoot({
      level: 'info',
      format: winston.format.combine(
        winston.format.splat(),
        winston.format.timestamp(),
        winston.format.printf((info) => {
          const prefixes = info.prefix ? (Array.isArray(info.prefix) ? info.prefix : [info.prefix]) : undefined;
          const messagePrefix = prefixes ? prefixes.concat('').join(' | ') : '';
          return util.format('%s %s %s%s', info.timestamp, info.level.toUpperCase(), messagePrefix, info.message);
        }),
      ),
      transports: [new winston.transports.Console({ level: 'info' })],
    }),
  ],
})
export class LoggerModule {}
