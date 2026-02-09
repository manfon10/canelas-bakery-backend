import { IsNotEmpty, IsString } from 'class-validator';

export class GetProductBySlugParamsDto {
  @IsNotEmpty()
  @IsString()
  slug: string;
}
