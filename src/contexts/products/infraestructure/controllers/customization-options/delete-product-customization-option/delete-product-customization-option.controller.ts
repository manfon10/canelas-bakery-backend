import { Body, Controller, Delete, HttpCode, HttpStatus, Param } from '@nestjs/common';

import { Auth } from '@/contexts/auth/infraestructure/decorators';
import { DeleteProductCustomizationOptionByIdUseCase } from '@/contexts/products/application/customization-options';

import { GetProductCustomizationOptionParamsDto } from './delete-product-customization-option.dto';

@Controller('/customization-options')
export class DeleteProductCustomizationOptionController {
  constructor(
    private readonly deleteProductCustomizationOptionUseCase: DeleteProductCustomizationOptionByIdUseCase,
  ) {}

  @Auth()
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async run(@Param() params: GetProductCustomizationOptionParamsDto): Promise<void> {
    await this.deleteProductCustomizationOptionUseCase.execute(params.id);
  }
}
