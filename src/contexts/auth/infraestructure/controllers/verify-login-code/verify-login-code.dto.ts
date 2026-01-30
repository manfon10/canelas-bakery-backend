import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class VerifyLoginCodeDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 6)
  code: string;
}
