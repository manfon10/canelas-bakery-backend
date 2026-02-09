import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { Product } from '@/contexts/products/domain/entities';
import { ProductRepository } from '@/contexts/products/domain/repositories';

@Injectable()
export class GetProductBySlugUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly ProductRepository: ProductRepository,
  ) {}

  async execute(slug: string): Promise<Product> {
    const product = await this.ProductRepository.findBySlug(slug);

    if (!product) {
      throw new BadRequestException(`El producto con el slug ${slug} no existe`);
    }

    return product;
  }
}
