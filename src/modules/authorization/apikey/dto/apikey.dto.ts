import { IsInt, IsString, Max, Min, ValidateIf } from "class-validator";

export class SignInDto {
  @IsString()
  @Min(3)
  username: string;

  @IsString()
  @Min(6)
  password: string;
}
