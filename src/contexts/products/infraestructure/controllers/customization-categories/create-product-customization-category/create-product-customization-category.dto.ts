import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';

import { ProductCustomizationCategoryType } from '@/contexts/products/domain/enums';

export class CreateProductCustomizationCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(ProductCustomizationCategoryType)
  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  @IsInt()
  min: number;

  @IsNotEmpty()
  @IsInt()
  max: number;

  @IsNotEmpty()
  @IsBoolean()
  required: boolean;
}
