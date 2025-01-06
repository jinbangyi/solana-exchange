import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { Market } from "./market";

export class Exchange {
  @ApiProperty({ type: Number })
  id: number;

  @ApiPropertyOptional({ type: String })
  name?: string = "Raydium Liquidity Pool V4";

  @ApiPropertyOptional({ type: Number })
  fee?: number = 0.0025;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ isArray: true, type: () => Market })
  Market: Market[];
}
