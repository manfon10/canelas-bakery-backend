import { Controller, Delete, HttpCode, HttpStatus, Param } from '@nestjs/common';

import { Auth } from '@/contexts/auth/infraestructure/decorators';
import { DeleteProductCategoryByIdUseCase } from '@/contexts/products/application/categories';

@Controller('/categories')
export class DeleteProductCategoryController {
  constructor(private readonly deleteProductCategory: DeleteProductCategoryByIdUseCase) {}

  @Auth()
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async run(@Param('id') id: number): Promise<void> {
    await this.deleteProductCategory.execute(id);
  }
}
