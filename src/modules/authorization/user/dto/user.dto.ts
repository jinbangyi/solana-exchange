import {
  IsInt,
  IsString,
  Max,
  Min,
  MinLength,
  ValidateIf,
} from "class-validator";

export class RegistryDto {
  @MinLength(3)
  @IsString()
  username: string;

  @MinLength(3)
  @IsString()
  password: string;
}
