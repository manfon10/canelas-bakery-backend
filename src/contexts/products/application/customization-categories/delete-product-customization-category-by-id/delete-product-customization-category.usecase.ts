import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { ProductCustomizationCategoryRepository } from '../../../domain/repositories';

@Injectable()
export class DeleteProductCustomizationCategoryByIdUseCase {
  constructor(
    @Inject('ProductCustomizationCategoryRepository')
    private readonly productCustomizationCategoryRepository: ProductCustomizationCategoryRepository,
  ) {}

  async execue(id: number): Promise<void> {
    const category = await this.productCustomizationCategoryRepository.findById(id);

    if (!category) {
      throw new BadRequestException('La categoria de perzonalizacion no existe.');
    }

    await this.productCustomizationCategoryRepository.delete(id);
  }
}
