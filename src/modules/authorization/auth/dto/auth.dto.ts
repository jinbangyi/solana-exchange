import {
  IsInt,
  IsString,
  Max,
  Min,
  MinLength,
  ValidateIf,
} from "class-validator";

export class SignInDto {
  @IsString()
  @MinLength(3)
  username: string;

  @IsString()
  @MinLength(3)
  password: string;
}
