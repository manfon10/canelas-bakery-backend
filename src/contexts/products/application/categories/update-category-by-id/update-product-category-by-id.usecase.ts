import { Inject, Injectable } from '@nestjs/common';

import { ProductCategoryRepository } from '../../../domain/repositories';

import { UpdateProductCategoryDto } from './update-category.dto';

@Injectable()
export class UpdateProductCategoryByIdUseCase {
  constructor(
    @Inject('ProductCategoryRepository')
    private readonly productCategoryRepository: ProductCategoryRepository,
  ) {}

  async execue(id: number, data: UpdateProductCategoryDto): Promise<void> {
    const { name, is_active } = data;

    await this.productCategoryRepository.update(id, {
      name,
      is_active,
    });
  }
}
