import { Inject, Injectable } from '@nestjs/common';

import { ProductCustomizationCategoryRepository } from '../../../domain/repositories';
import { ProductCustomizationCategory } from '../../../domain/entities';

import { CreateProductCustomizationCategoryDto } from './create-product-customization-category.dto';

@Injectable()
export class CreateProductCustomizationCategoryUseCase {
  constructor(
    @Inject('ProductCustomizationCategoryRepository')
    private readonly productCustomizationCategoryRepository: ProductCustomizationCategoryRepository,
  ) {}

  async execue(data: CreateProductCustomizationCategoryDto): Promise<ProductCustomizationCategory> {
    const { name, max, min, type, required } = data;

    return await this.productCustomizationCategoryRepository.create({
      name,
      max,
      min,
      required,
      type,
    });
  }
}
