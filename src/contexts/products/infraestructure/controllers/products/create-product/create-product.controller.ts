import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { Auth } from '@/contexts/auth/infraestructure/decorators';
import { ProductCategory } from '@/contexts/products/domain/entities';
import { CreateProductUseCase } from '@/contexts/products/application/products';

import { CreateProductDto } from './create-product.dto';

@Controller('/products')
export class CreateProductController {
  constructor(private readonly createProduct: CreateProductUseCase) {}

  @Auth()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async run(@Body() data: CreateProductDto): Promise<ProductCategory> {
    return await this.createProduct.execute(data);
  }
}
