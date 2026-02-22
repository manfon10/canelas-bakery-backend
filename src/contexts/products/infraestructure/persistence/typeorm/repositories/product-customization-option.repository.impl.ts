import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import {
  ProductCustomizationOptionPrimitives,
  ProductCustomizationOption,
} from '@/contexts/products/domain/entities';
import { ProductCustomizationOptionRepository } from '@/contexts/products/domain/repositories';

import { ProductCustomizationOptionSchema } from '../schemas';

export class TypeOrmProductCustomizationOptionImpl implements ProductCustomizationOptionRepository {
  constructor(
    @InjectRepository(ProductCustomizationOptionSchema)
    private readonly repository: Repository<ProductCustomizationOptionSchema>,
  ) {}

  async bulkCreate(data: ProductCustomizationOptionPrimitives[]): Promise<void> {
    await this.repository.insert(data);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete({ id });
  }

  async findById(id: number): Promise<ProductCustomizationOption | null> {
    const productCustomizationOption = await this.repository
      .createQueryBuilder('product_customization_option')
      .leftJoin('product_customization_option.customization_category', 'customization_category')
      .select([
        'product_customization_option.id',
        'product_customization_option.name',
        'product_customization_option.extra_price',
        'product_customization_option.description',

        'customization_category.id',
        'customization_category.name',
        'customization_category.required',
        'customization_category.min',
        'customization_category.max',
        'customization_category.type',
      ])
      .where('product_customization_option.id = :id', { id })
      .getOne();

    return productCustomizationOption
      ? ProductCustomizationOption.fromObject(productCustomizationOption)
      : null;
  }

  async findAll(): Promise<ProductCustomizationOption[]> {
    const productCustomizationCategories = await this.repository
      .createQueryBuilder('product_customization_option')
      .leftJoin('product_customization_option.customization_category', 'customization_category')
      .select([
        'product_customization_option.id',
        'product_customization_option.name',
        'product_customization_option.extra_price',
        'product_customization_option.description',

        'customization_category.id',
        'customization_category.name',
        'customization_category.required',
        'customization_category.min',
        'customization_category.max',
        'customization_category.type',
      ])
      .getMany();

    return productCustomizationCategories.map(ProductCustomizationOption.fromObject);
  }

  async update(id: number, data: Partial<ProductCustomizationOptionPrimitives>): Promise<void> {
    await this.repository.update(id, data);
  }
}
