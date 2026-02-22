import { Controller, Delete, HttpCode, HttpStatus, Param } from '@nestjs/common';

import { Auth } from '@/contexts/auth/infraestructure/decorators';
import { DeleteProductCustomizationCategoryByIdUseCase } from '@/contexts/products/application/customization-categories';

import { DeleteProductCustomizationCategoryParamsDto } from './delete-product-customization-category.dto';

@Controller('/customization-categories')
export class DeleteProductCustomizationCategoryByIdController {
  constructor(
    private readonly deleteProductCustomizationCategoryUseCase: DeleteProductCustomizationCategoryByIdUseCase,
  ) {}

  @Auth()
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async run(@Param() params: DeleteProductCustomizationCategoryParamsDto): Promise<void> {
    await this.deleteProductCustomizationCategoryUseCase.execue(params.id);
  }
}
