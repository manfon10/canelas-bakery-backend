import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { ProductCategory } from '@/contexts/products/domain/entities';
import { ProductCategoryRepository } from '@/contexts/products/domain/repositories';

@Injectable()
export class GetProductCategoryByIdUseCase {
  constructor(
    @Inject('ProductCategoryRepository')
    private readonly productCategoryRepository: ProductCategoryRepository,
  ) {}

  async execute(id: number): Promise<ProductCategory> {
    const category = await this.productCategoryRepository.findById(id);

    if (!category) {
      throw new BadRequestException(`La categoria especificada no existe`);
    }

    return category;
  }
}
