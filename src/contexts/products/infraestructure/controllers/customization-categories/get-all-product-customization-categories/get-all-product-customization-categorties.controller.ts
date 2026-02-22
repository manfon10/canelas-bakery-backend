import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

import { Auth } from '@/contexts/auth/infraestructure/decorators';
import { ProductCustomizationCategory } from '@/contexts/products/domain/entities';
import { GetAllProductCustomizationCategoriesUseCase } from '@/contexts/products/application/customization-categories';

@Controller('/customization-categories')
export class GetAllProductCustomizationCategoriesController {
  constructor(
    private readonly getAllProductCustomizationCategoriee: GetAllProductCustomizationCategoriesUseCase,
  ) {}

  @Auth()
  @Get()
  @HttpCode(HttpStatus.OK)
  async run(): Promise<ProductCustomizationCategory[]> {
    return await this.getAllProductCustomizationCategoriee.execute();
  }
}
