import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { LoggerService } from "@modules/internal/logger/logger.service";
import { RedisService } from "@modules/internal/redis/redis.service";

import { CurrencyInterface, MarketInterface } from "./interfaces/types";
import { TimeFrame } from "./dto/market.dto";
import { Trade } from "./interfaces/exchange";
import { TradeTick } from "ohlc-resample/dist/types";
import { resampleTicksByTime } from "ohlc-resample";

@Injectable()
export class MarketService {
  constructor(
    private readonly configService: ConfigService,
    private readonly logger: LoggerService,
    private readonly redisService: RedisService,
  ) {
    this.logger.setContext("MarketService");
  }

  // read valid currency list from redis
  async getCurrencies(): Promise<CurrencyInterface[]> {
    // TODO read from db
    const key = "token:created";
    const pumpfunDefaultDecimal = 6;
    // read sortedset from redis
    const currencies = await this.redisService.zrange(key, 0, -1);
    return currencies.map((currency) => {
      return {
        precision: pumpfunDefaultDecimal,
        name: currency,
        code: currency,
        id: currency,
        limits: {
          amount: {
            min: 0.1,
            max: 10,
          },
          withdraw: {
            min: 0,
            max: 0,
          },
        },
        networks: {},
      };
    });
  }

  async getMarkets(): Promise<MarketInterface[]> {
    const currencies = await this.getCurrencies();
    const ret = [];
    currencies.forEach((currency) => {
      ret.push({
        id: currency.id,
        symbol: `${currency.id}/SOL`,
        base: currency.id,
        quote: "SOL",
        active: true,
        type: "spot",
        spot: true,
        margin: false,
        swap: false,
        future: false,
        option: false,
        contract: false,
        taker: 0.002,
        maker: 0.002,
        percentage: true,
        feeSide: "quote",
        precision: {
          amount: 6,
          price: 6,
          cost: 6,
        },
        limits: {
          cost: {
            min: 0.1,
            max: 10,
          },
        },
      });
    });
    return ret;
  }

  async getOHLCV(currency: string, timeframe: number, since: number, limit: number): Promise<any> {
    this.logger.debug(`getOHLCV: ${currency}, ${timeframe}, ${since}, ${limit}`);
    // TODO read from db
    const key = `token:trade:${currency}`;
    // read sortedset from redis
    const trades = await this.redisService.lrange(key, 0, -1);

    const filteredTrades: TradeTick[] = [];
    for (const trade of trades) {
      const tradeObj: Trade = JSON.parse(trade);
      if (tradeObj.timestamp >= since) {
        filteredTrades.push({
          time: tradeObj.timestamp,
          price: tradeObj.tokenAmount / tradeObj.solAmount / 1000000,
          quantity: tradeObj.solAmount,
        });
      }
    }

    this.logger.debug(`filteredTrades: ${filteredTrades.length}, example: ${JSON.stringify(filteredTrades[0])}`);

    // TODO resample
    const ret = resampleTicksByTime(filteredTrades, {
      timeframe,
      includeLatestCandle: true,
      fillGaps: true,
    });

    this.logger.debug(`ret: ${ret.length}`);
    return ret.slice(0, limit);
  }
}
