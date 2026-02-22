import { Body, Controller, HttpCode, HttpStatus, Param, Patch } from '@nestjs/common';

import { Auth } from '@/contexts/auth/infraestructure/decorators';
import { UpdateProductCustomizationCategoryByIdUseCase } from '@/contexts/products/application/customization-categories';

import {
  GetProductCustomizationCategoryParamsDto,
  UpdateProductCustomizationCategoryDto,
} from './update-product-customization-category.dto';

@Controller('/customization-categories')
export class UpdateProductCustomizationCategoryByIdController {
  constructor(
    private readonly updateProductCustomizationCategoryUseCase: UpdateProductCustomizationCategoryByIdUseCase,
  ) {}

  @Auth()
  @Patch('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async run(
    @Param() params: GetProductCustomizationCategoryParamsDto,
    @Body() data: UpdateProductCustomizationCategoryDto,
  ): Promise<void> {
    await this.updateProductCustomizationCategoryUseCase.execue(params.id, data);
  }
}
