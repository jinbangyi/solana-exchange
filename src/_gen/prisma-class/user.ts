import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Role } from "@prisma/client";

import { ApiKeyAccount } from "./api_key_account";

export class User {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  uuid: string;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  password: string;

  @ApiProperty({ type: String })
  salt: string;

  @ApiProperty({ enum: Role, enumName: "Role" })
  role: Role = Role.USER;

  @ApiProperty({ type: Boolean })
  isActive: boolean;

  @ApiPropertyOptional({ type: Date })
  lastLoginAt?: Date;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ isArray: true, type: () => ApiKeyAccount })
  ApiKeyAccount: ApiKeyAccount[];
}
