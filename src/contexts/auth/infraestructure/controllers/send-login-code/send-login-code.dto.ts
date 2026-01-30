import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SendCodeLoginDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
