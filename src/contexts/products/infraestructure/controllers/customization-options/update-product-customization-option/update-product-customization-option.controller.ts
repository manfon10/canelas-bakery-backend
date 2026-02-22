import { Body, Controller, HttpCode, HttpStatus, Param, Patch } from '@nestjs/common';

import { Auth } from '@/contexts/auth/infraestructure/decorators';
import { UpdateProductCustomizationOptionByIdUseCase } from '@/contexts/products/application/customization-options';

import {
  GetProductCustomizationOptionParamsDto,
  UpdateOptionDto,
} from './update-product-customization-option.dto';

@Controller('/customization-options')
export class UpdateProductCustomizationOptionController {
  constructor(
    private readonly updateProductCustomizationOptionUseCase: UpdateProductCustomizationOptionByIdUseCase,
  ) {}

  @Auth()
  @Patch('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async run(
    @Param() params: GetProductCustomizationOptionParamsDto,
    @Body() data: UpdateOptionDto,
  ): Promise<void> {
    await this.updateProductCustomizationOptionUseCase.execute(params.id, data);
  }
}
