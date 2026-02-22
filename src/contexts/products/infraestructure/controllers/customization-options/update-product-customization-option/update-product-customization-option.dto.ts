import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateOptionDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  extra_price: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsInt()
  customization_category_id: number;
}

export class GetProductCustomizationOptionParamsDto {
  @IsNotEmpty()
  @IsInt()
  id: number;
}
