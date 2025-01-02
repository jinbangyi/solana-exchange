import { Exchange } from "./exchange";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class Market {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  marketId: string;

  @ApiProperty({ type: Number })
  exchangeId: number;

  @ApiPropertyOptional({ type: Boolean })
  isCanonical?: boolean;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: () => Exchange })
  Exchange: Exchange;
}
