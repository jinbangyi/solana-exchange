import { Body, Controller, Get, Param, Post, Query, Request } from "@nestjs/common";
import { ApiSecurity } from "@nestjs/swagger";
import { of } from "rxjs";

import { UserEntity } from "@modules/authorization/user/interfaces/types";
import { LoggerService } from "@modules/internal/logger/logger.service";

import { CurrencyInterface, Int, MarketInterface, OHLCV } from "./interfaces/types";
import { MarketService } from "./market.service";
import { FetchOHLCVDto } from "./dto/market.dto";

// @ApiSecurity("ApiKey-auth")
@Controller({
  path: "/market",
  version: "1",
})
export class MarketController {
  constructor(
    private readonly logger: LoggerService,
    private readonly marketService: MarketService,
  ) {
    this.logger.setContext("MarketController");
  }

  @Get("/currencies")
  async fetchCurrencies(): Promise<Record<string, CurrencyInterface>> {
    const currencies = await this.marketService.getCurrencies();

    const ret = {};
    currencies.forEach((currency) => {
      ret[currency.code] = currency;
    });
    return ret;
  }

  @Get("")
  async fetchMarkets(): Promise<MarketInterface[]> {
    return this.marketService.getMarkets();
  }

  @Get("/ohlcv")
  async fetchOHLCV(@Query() fetchOHLCVDto: FetchOHLCVDto): Promise<OHLCV[]> {
    console.log(fetchOHLCVDto);
    const token = fetchOHLCVDto.symbol.split('/')[0];
    // TODO check since, symbol
    let timeframe = 10;
    if (fetchOHLCVDto.timeframe === "1m") {
      timeframe = 60;
    } else if (fetchOHLCVDto.timeframe === "5m") {
      timeframe = 300;
    } else if (fetchOHLCVDto.timeframe === "15m") {
      timeframe = 900;
    } else if (fetchOHLCVDto.timeframe === "30m") {
      timeframe = 1800;
    } else if (fetchOHLCVDto.timeframe === "1h") {
      timeframe = 3600;
    } else if (fetchOHLCVDto.timeframe === "4h") {
      timeframe = 14400;
    } else if (fetchOHLCVDto.timeframe === "1d") {
      timeframe = 86400;
    } else if (fetchOHLCVDto.timeframe === "1w") {
      timeframe = 604800;
    } else if (fetchOHLCVDto.timeframe === "1M") {
      timeframe = 2592000;
    } else {
      timeframe = 10;
    }
  
    // TODO return internal python http server
    return this.marketService.getOHLCV(token, timeframe, Number(fetchOHLCVDto.since), fetchOHLCVDto.limit);
  }
  // async fetchOHLCV(@Param("market") market: string): Promise<Record<string, any>> {
  //   return this.marketService.getOHLCV(market);
  // }
}
