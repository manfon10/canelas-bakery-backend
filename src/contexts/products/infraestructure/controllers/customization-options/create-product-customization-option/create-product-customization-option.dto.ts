import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class CreateOptionDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  extra_price: number;

  @IsNotEmpty()
  @IsString()
  description: string;
}

export class CreateProductCustomizationOptionDto {
  @IsNotEmpty()
  @IsInt()
  customization_category_id: number;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOptionDto)
  options: CreateOptionDto[];
}
