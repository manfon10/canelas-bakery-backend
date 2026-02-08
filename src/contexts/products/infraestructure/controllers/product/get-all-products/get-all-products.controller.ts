import { Controller, Get } from '@nestjs/common';

import { Auth } from '@/contexts/auth/infraestructure/decorators';
import { GetAllProductsUseCase } from '@/contexts/products/application/products';
import { Product } from '@/contexts/products/domain/entities';

@Controller('/products')
export class GetAllProductsController {
  constructor(private readonly getAllProducts: GetAllProductsUseCase) {}

  @Auth()
  @Get()
  async run(): Promise<Product[]> {
    return await this.getAllProducts.execue();
  }
}
