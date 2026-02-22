import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import {
  ProductCustomizationCategoryRepository,
  ProductCustomizationOptionRepository,
} from '../../../domain/repositories';

import { CreateProductCustomizationOptionDto } from './create-product-customization-option.dto';

@Injectable()
export class CreateProductCustomizationOptionUseCase {
  constructor(
    @Inject('ProductCustomizationOptionRepository')
    private readonly productCustomizationOptionRepository: ProductCustomizationOptionRepository,

    @Inject('ProductCustomizationCategoryRepository')
    private readonly productCustomizationCategoryRepository: ProductCustomizationCategoryRepository,
  ) {}

  async execute(data: CreateProductCustomizationOptionDto): Promise<void> {
    const { customization_category_id, options } = data;

    const category =
      await this.productCustomizationCategoryRepository.findById(customization_category_id);

    if (!category) {
      throw new BadRequestException('La categoria de perzonalizacion no existe.');
    }

    const optionsInsert = options.map((option) => ({
      customization_category_id,
      name: option.name,
      description: option.description,
      extra_price: option.extra_price,
    }));

    await this.productCustomizationOptionRepository.bulkCreate(optionsInsert);
  }
}
