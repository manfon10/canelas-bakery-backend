import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { ProductCustomizationCategoryType } from '@/contexts/products/domain/enums';

export class DeleteProductCustomizationCategoryParamsDto {
  @IsNotEmpty()
  @IsInt()
  id: number;
}
