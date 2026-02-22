import { Inject, Injectable } from '@nestjs/common';

import { ProductCustomizationOption } from '@/contexts/products/domain/entities';
import { ProductCustomizationOptionRepository } from '@/contexts/products/domain/repositories';

@Injectable()
export class GetAllProductCustomizationOptionsUseCase {
  constructor(
    @Inject('ProductCustomizationOptionRepository')
    private readonly productCustomizationOptionRepository: ProductCustomizationOptionRepository,
  ) {}

  async execute(): Promise<ProductCustomizationOption[]> {
    return await this.productCustomizationOptionRepository.findAll();
  }
}
