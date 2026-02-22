import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import {
  ProductCategoryCustomizationRepository,
  ProductCategoryRepository,
  ProductCustomizationCategoryRepository,
} from '../../../domain/repositories';

import { AssignCustomizationToCategoryDto } from './assign-customization-to-category.dto';

@Injectable()
export class AssignCustomizationToCategoryUseCase {
  constructor(
    @Inject('ProductCategoryRepository')
    private readonly productCategoryRepository: ProductCategoryRepository,

    @Inject('ProductCustomizationCategoryRepository')
    private readonly productCustomizationCategoryRepository: ProductCustomizationCategoryRepository,

    @Inject('ProductCategoryCustomizationRepository')
    private readonly productCategoryCustomizationRepository: ProductCategoryCustomizationRepository,
  ) {}

  async execute(data: AssignCustomizationToCategoryDto): Promise<void> {
    const { product_category_id, product_customization_category_id } = data;

    const relationExist =
      await this.productCategoryCustomizationRepository.existsCustomizationRelation(
        product_category_id,
        product_customization_category_id,
      );

    if (relationExist) {
      throw new BadRequestException('La categoria ya tiene asignada la customizacion indicada.');
    }

    const productCategory = await this.productCategoryRepository.findById(product_category_id);

    if (!productCategory) {
      throw new BadRequestException('La categoria del producto no existe.');
    }

    const customizationCategory = await this.productCustomizationCategoryRepository.findById(
      product_customization_category_id,
    );

    if (!customizationCategory) {
      throw new BadRequestException('La categoria de perzonalizacion no existe.');
    }

    await this.productCategoryCustomizationRepository.assignCustomizationToCategory(
      product_category_id,
      product_customization_category_id,
    );
  }
}
