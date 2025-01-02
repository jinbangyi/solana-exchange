import { User } from "./user";
import { ApiProperty } from "@nestjs/swagger";

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
