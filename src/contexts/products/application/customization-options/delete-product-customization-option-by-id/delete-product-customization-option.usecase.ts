import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { ProductCustomizationOptionRepository } from '../../../domain/repositories';

@Injectable()
export class DeleteProductCustomizationOptionByIdUseCase {
  constructor(
    @Inject('ProductCustomizationOptionRepository')
    private readonly productCustomizationCategoryRepository: ProductCustomizationOptionRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const option = await this.productCustomizationCategoryRepository.findById(id);

    if (!option) {
      throw new BadRequestException('La opcion de perzonalizacion no existe.');
    }

    await this.productCustomizationCategoryRepository.delete(id);
  }
}
