import { IsInt, IsNotEmpty } from 'class-validator';

export class GetProductCustomizationOptionParamsDto {
  @IsNotEmpty()
  @IsInt()
  id: number;
}
