import { Inject, Injectable } from '@nestjs/common';

import { ProductCustomizationCategory } from '@/contexts/products/domain/entities';
import { ProductCustomizationCategoryRepository } from '@/contexts/products/domain/repositories';

@Injectable()
export class GetAllProductCustomizationCategoriesUseCase {
  constructor(
    @Inject('ProductCustomizationCategoryRepository')
    private readonly productCustomizationCategoryRepository: ProductCustomizationCategoryRepository,
  ) {}

  async execute(): Promise<ProductCustomizationCategory[]> {
    return await this.productCustomizationCategoryRepository.findAll();
  }
}
