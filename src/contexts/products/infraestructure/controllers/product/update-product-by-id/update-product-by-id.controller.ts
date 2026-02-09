import { Body, Controller, HttpCode, HttpStatus, Param, Patch } from '@nestjs/common';

import { Auth } from '@/contexts/auth/infraestructure/decorators';
import { UpdateProductUseCase } from '@/contexts/products/application/products';

import { UpdateProductDto, UpdateProductParamsDto } from './update-product.dto';

@Controller('/products')
export class UpdateProductByIdController {
  constructor(private readonly updateProductById: UpdateProductUseCase) {}

  @Auth()
  @Patch('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async run(
    @Param('id') param: UpdateProductParamsDto,
    @Body() data: UpdateProductDto,
  ): Promise<void> {
    await this.updateProductById.execute(param.id, data);
  }
}
