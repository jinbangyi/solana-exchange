import { Optional } from "@nestjs/common";
import { Allow, IsInt, IsNumber, IsString, Max, Min, ValidateIf } from "class-validator";

export type TimeFrame = "10s" | "1m" | "5m" | "15m" | "30m" | "1h" | "4h" | "1d" | "1w" | "1M";

export class FetchOHLCVDto {
  @IsString()
  @Optional()
  symbol: string;

  @IsString()
  @Optional()
  timeframe: string = "10s";
  // seconds, one day

  // TODO auto convert to number
  @Allow()
  @Optional()
  since: string = (Date.now() / 1000 - 86400).toString().split(".")[0];

  // @Min(100)
  // @Max(8640)
  // @IsInt()
  // @Optional()
  limit: number = 8640;
}
