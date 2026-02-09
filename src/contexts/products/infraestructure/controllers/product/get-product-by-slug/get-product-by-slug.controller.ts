import { Controller, Get, Param } from '@nestjs/common';

import { GetProductBySlugUseCase } from '@/contexts/products/application/products';
import { Product } from '@/contexts/products/domain/entities';
import { GetProductBySlugParamsDto } from './get-product-by-slug.dto';

@Controller('/products')
export class GetProductBySlugController {
  constructor(private readonly getProductBySlug: GetProductBySlugUseCase) {}

  @Get('/:slug')
  async run(@Param() params: GetProductBySlugParamsDto): Promise<Product> {
    return await this.getProductBySlug.execute(params.slug);
  }
}
