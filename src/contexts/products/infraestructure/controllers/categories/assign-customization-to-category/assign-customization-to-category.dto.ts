import { IsInt, IsNotEmpty } from 'class-validator';

export class AssignCustomizationToCategoryDto {
  @IsInt()
  @IsNotEmpty()
  product_customization_category_id: number;
}

export class AssignCustomizationToCategoryParamsDto {
  @IsNotEmpty()
  @IsInt()
  id: number;
}
