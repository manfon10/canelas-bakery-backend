import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { ProductCustomizationCategoryRepository } from '../../../domain/repositories';

import { UpdateProductCustomizationCategoryDto } from './update-product-customization-category.dto';

@Injectable()
export class UpdateProductCustomizationCategoryByIdUseCase {
  constructor(
    @Inject('ProductCustomizationCategoryRepository')
    private readonly productCustomizationCategoryRepository: ProductCustomizationCategoryRepository,
  ) {}

  async execue(id: number, data: UpdateProductCustomizationCategoryDto): Promise<void> {
    const { name, max, min, type, required } = data;

    const category = await this.productCustomizationCategoryRepository.findById(id);

    if (!category) {
      throw new BadRequestException('La categoria de perzonalizacion no existe.');
    }

    await this.productCustomizationCategoryRepository.update(id, {
      name,
      max,
      min,
      required,
      type,
    });
  }
}
