import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
