import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { ProductCategoryRepository, ProductRepository } from '../../../domain/repositories';
import { Product } from '../../../domain/entities';

import { CreateProductDto } from './create-product.dto';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,

    @Inject('ProductCategoryRepository')
    private readonly productCategoryRepository: ProductCategoryRepository,
  ) {}

  async execute(data: CreateProductDto): Promise<Product> {
    const { base_price, category_id, description, name, type } = data;

    const category = await this.productCategoryRepository.findById(category_id);

    if (base_price <= 0) {
      throw new BadRequestException('El precio base no puede ser menor a 0');
    }

    if (!category) {
      throw new BadRequestException('La categoria especificada no existe');
    }

    return await this.productRepository.create({
      base_price,
      category_id,
      description,
      name,
      type,
    });
  }
}
