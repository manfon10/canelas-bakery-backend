import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { ProductCategoryRepository } from '@/contexts/products/domain/repositories';

@Injectable()
export class DeleteProductCategoryByIdUseCase {
  constructor(
    @Inject('ProductCategoryRepository')
    private readonly productCategoryRepository: ProductCategoryRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const category = await this.productCategoryRepository.findById(id);

    if (!category) {
      throw new BadRequestException(`La categoria especificada no existe`);
    }

    await this.productCategoryRepository.delete(id);
  }
}
