import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';

import { ProductType } from '@/contexts/products/domain/enums';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(ProductType)
  @IsNotEmpty()
  type: ProductType;

  @IsInt()
  @IsNotEmpty()
  base_price: number;

  @IsInt()
  @IsNotEmpty()
  category_id: number;
}
