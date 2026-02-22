import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { ProductCustomizationCategoryType } from '@/contexts/products/domain/enums';

export class UpdateProductCustomizationCategoryDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsEnum(ProductCustomizationCategoryType)
  @IsOptional()
  type: string;

  @IsOptional()
  @IsInt()
  min: number;

  @IsOptional()
  @IsInt()
  max: number;

  @IsOptional()
  @IsBoolean()
  required: boolean;
}

export class GetProductCustomizationCategoryParamsDto {
  @IsNotEmpty()
  @IsInt()
  id: number;
}
