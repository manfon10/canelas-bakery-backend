import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

import { Auth } from '@/contexts/auth/infraestructure/decorators';
import { GetAllProductCategoriesUseCase } from '@/contexts/products/application/categories';
import { ProductCategory } from '@/contexts/products/domain/entities';

@Controller('/categories')
export class GetAllProductCategoriesController {
  constructor(private readonly getAllProductCategories: GetAllProductCategoriesUseCase) {}

  @Auth()
  @Get()
  @HttpCode(HttpStatus.OK)
  async run(): Promise<ProductCategory[]> {
    return await this.getAllProductCategories.execute();
  }
}
