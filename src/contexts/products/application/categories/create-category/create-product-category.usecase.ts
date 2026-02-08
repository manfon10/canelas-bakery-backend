import { Inject, Injectable } from '@nestjs/common';

import { ProductCategoryRepository } from '../../../domain/repositories';
import { ProductCategory } from '../../../domain/entities';

import { CreateProductCategoryDto } from './create-category.dto';

@Injectable()
export class CreateProductCategoryUseCase {
  constructor(
    @Inject('ProductCategoryRepository')
    private readonly productCategoryRepository: ProductCategoryRepository,
  ) {}

  async execue(data: CreateProductCategoryDto): Promise<ProductCategory> {
    const { name } = data;

    return await this.productCategoryRepository.create({
      name,
    });
  }
}
