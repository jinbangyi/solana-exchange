import { ApiProperty } from "@nestjs/swagger";

import { User } from "./user";

export class ApiKeyAccount {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  userUuid: string;

  @ApiProperty({ type: String })
  apiKey: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: () => User })
  User: User;
}
