import { Controller, Get } from '@nestjs/common';

import { GetAllProductsUseCase } from '@/contexts/products/application/products';
import { Product } from '@/contexts/products/domain/entities';

@Controller('/products')
export class GetAllProductsController {
  constructor(private readonly getAllProducts: GetAllProductsUseCase) {}

  @Get()
  async run(): Promise<Product[]> {
    return await this.getAllProducts.execute();
  }
}
