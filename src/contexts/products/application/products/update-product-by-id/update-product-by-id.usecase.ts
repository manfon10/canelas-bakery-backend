import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { ProductCategoryRepository, ProductRepository } from '../../../domain/repositories';

import { UpdateProductDto } from './update-product.dto';

@Injectable()
export class UpdateProductUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,

    @Inject('ProductCategoryRepository')
    private readonly productCategoryRepository: ProductCategoryRepository,
  ) {}

  async execute(id: number, data: UpdateProductDto): Promise<void> {
    const { base_price, category_id, description, name, type } = data;

    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new BadRequestException('El producto especificada no existe');
    }

    const category = await this.productCategoryRepository.findById(category_id);

    if (base_price <= 0) {
      throw new BadRequestException('El precio base no puede ser menor a 0');
    }

    if (!category) {
      throw new BadRequestException('La categoria especificada no existe');
    }

    await this.productRepository.update(id, {
      base_price,
      category_id,
      description,
      name,
      type,
    });
  }
}
