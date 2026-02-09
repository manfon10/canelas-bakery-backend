import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

import { ProductType } from '@/contexts/products/domain/enums';
import { Transform } from 'class-transformer';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsEnum(ProductType)
  @IsOptional()
  type: ProductType;

  @IsInt()
  @IsOptional()
  base_price: number;

  @IsInt()
  @IsOptional()
  category_id: number;

  @IsOptional()
  @IsBoolean()
  is_active: boolean;
}

export class UpdateProductParamsDto {
  @IsInt()
  @IsPositive()
  @Transform(({ value }) => parseInt(value, 10))
  id: number;
}
