import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';

import { Auth } from '@/contexts/auth/infraestructure/decorators';
import { GetProductCategoryByIdUseCase } from '@/contexts/products/application/categories';
import { ProductCategory } from '@/contexts/products/domain/entities';

@Controller('/categories')
export class GetProductCategoryByIdController {
  constructor(private readonly getProductCategory: GetProductCategoryByIdUseCase) {}

  @Auth()
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async run(@Param('id') id: number): Promise<ProductCategory> {
    return await this.getProductCategory.execute(id);
  }
}
