import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class Token {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  tokenId: string;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  symbol: string;

  @ApiProperty({ type: Number })
  decimals: number;

  @ApiPropertyOptional({ type: Boolean })
  isCanonical?: boolean;

  @ApiPropertyOptional({ type: String })
  fullName?: string;

  @ApiPropertyOptional({ type: Number })
  sellerFeeBasisPoints?: number;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}
