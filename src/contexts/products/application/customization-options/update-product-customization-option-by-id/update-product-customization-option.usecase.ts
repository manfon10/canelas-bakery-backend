import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { ProductCustomizationOptionRepository } from '../../../domain/repositories';

import { UpdateProductCustomizationOptionDto } from './update-product-customization-option.dto';

@Injectable()
export class UpdateProductCustomizationOptionByIdUseCase {
  constructor(
    @Inject('ProductCustomizationOptionRepository')
    private readonly productCustomizationCategoryRepository: ProductCustomizationOptionRepository,
  ) {}

  async execute(id: number, data: UpdateProductCustomizationOptionDto): Promise<void> {
    const { name, customization_category_id, description, extra_price } = data;

    const option = await this.productCustomizationCategoryRepository.findById(id);

    if (!option) {
      throw new BadRequestException('La opcion de perzonalizacion no existe.');
    }

    await this.productCustomizationCategoryRepository.update(id, {
      name,
      customization_category_id,
      description,
      extra_price,
    });
  }
}
