import { Inject, Injectable } from '@nestjs/common';

import { ProductCategory } from '@/contexts/products/domain/entities';
import { ProductCategoryRepository } from '@/contexts/products/domain/repositories';

@Injectable()
export class GetAllProductCategoriesUseCase {
  constructor(
    @Inject('ProductCategoryRepository')
    private readonly productCategoryRepository: ProductCategoryRepository,
  ) {}

  async execute(): Promise<ProductCategory[]> {
    return await this.productCategoryRepository.findAll();
  }
}
