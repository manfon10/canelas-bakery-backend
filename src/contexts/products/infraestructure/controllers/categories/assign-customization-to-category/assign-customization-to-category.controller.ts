import { Body, Controller, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';

import { Auth } from '@/contexts/auth/infraestructure/decorators';
import { AssignCustomizationToCategoryUseCase } from '@/contexts/products/application/categories';

import {
  AssignCustomizationToCategoryDto,
  AssignCustomizationToCategoryParamsDto,
} from './assign-customization-to-category.dto';

@Controller('/categories')
export class AssignCustomizationToCategoryController {
  constructor(
    private readonly assignCustomizationToCategory: AssignCustomizationToCategoryUseCase,
  ) {}

  @Auth()
  @Post('/:id/customization')
  @HttpCode(HttpStatus.CREATED)
  async run(
    @Param() params: AssignCustomizationToCategoryParamsDto,
    @Body() data: AssignCustomizationToCategoryDto,
  ): Promise<void> {
    const { product_customization_category_id } = data;

    await this.assignCustomizationToCategory.execute({
      product_category_id: params.id,
      product_customization_category_id,
    });
  }
}
