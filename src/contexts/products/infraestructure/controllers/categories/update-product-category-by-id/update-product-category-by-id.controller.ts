import { Body, Controller, HttpCode, HttpStatus, Param, Patch } from '@nestjs/common';

import { Auth } from '@/contexts/auth/infraestructure/decorators';
import { UpdateProductCategoryByIdUseCase } from '@/contexts/products/application/categories';

import { UpdateCategoryProductDto } from './update-product-category.dto';

@Controller('/categories')
export class UpdateProductCategoryByIdController {
  constructor(private readonly updateProductCategory: UpdateProductCategoryByIdUseCase) {}

  @Auth()
  @Patch('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async run(@Param('id') id: number, @Body() data: UpdateCategoryProductDto): Promise<void> {
    await this.updateProductCategory.execue(id, data);
  }
}
