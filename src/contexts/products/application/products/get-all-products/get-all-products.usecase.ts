import { Inject, Injectable } from '@nestjs/common';

import { Product } from '@/contexts/products/domain/entities';
import { ProductRepository } from '@/contexts/products/domain/repositories';

@Injectable()
export class GetAllProductsUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly ProductRepository: ProductRepository,
  ) {}

  async execute(): Promise<Product[]> {
    return await this.ProductRepository.findAll();
  }
}
