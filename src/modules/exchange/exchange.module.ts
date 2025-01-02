import { Module } from "@nestjs/common";
import { ExchangeService } from "./exchange.service.js";
import { MarketController } from "./market.controller.js";

@Module({
  controllers: [MarketController],
  providers: [ExchangeService],
  exports: [ExchangeService],
})
export class ExchangeModule {}
