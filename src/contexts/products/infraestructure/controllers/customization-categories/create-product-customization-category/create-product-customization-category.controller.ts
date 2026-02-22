import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { Auth } from '@/contexts/auth/infraestructure/decorators';
import { CreateProductCustomizationCategoryUseCase } from '@/contexts/products/application/customization-categories';
import { ProductCustomizationCategory } from '@/contexts/products/domain/entities';

import { CreateProductCustomizationCategoryDto } from './create-product-customization-category.dto';

@Controller('/customization-categories')
export class CreateProductCustomizationCategoryController {
  constructor(
    private readonly createProductCustomizationCategoryUseCase: CreateProductCustomizationCategoryUseCase,
  ) {}

  @Auth()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async run(
    @Body() data: CreateProductCustomizationCategoryDto,
  ): Promise<ProductCustomizationCategory> {
    return await this.createProductCustomizationCategoryUseCase.execue(data);
  }
}
