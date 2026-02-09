import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryProductDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsOptional()
  @IsBoolean()
  is_active: boolean;
}
