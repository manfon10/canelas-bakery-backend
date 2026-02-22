import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import {
  ProductCustomizationCategoryPrimitives,
  ProductCustomizationCategory,
} from '@/contexts/products/domain/entities';
import { ProductCustomizationCategoryRepository } from '@/contexts/products/domain/repositories';

import { ProductCustomizationCategorySchema } from '../schemas';

export class TypeOrmProductCustomizationCategoryImpl implements ProductCustomizationCategoryRepository {
  constructor(
    @InjectRepository(ProductCustomizationCategorySchema)
    private readonly repository: Repository<ProductCustomizationCategorySchema>,
  ) {}

  async create(
    data: ProductCustomizationCategoryPrimitives,
  ): Promise<ProductCustomizationCategory> {
    const productCustomizationCategorySaved = await this.repository.save(data);

    const productCustomizationCategory = await this.findById(productCustomizationCategorySaved.id);

    return productCustomizationCategory!;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete({ id });
  }

  async findById(id: number): Promise<ProductCustomizationCategory | null> {
    const productCustomizationCategory = await this.repository
      .createQueryBuilder('product_customization_category')
      .select([
        'product_customization_category.id',
        'product_customization_category.name',
        'product_customization_category.type',
        'product_customization_category.required',
        'product_customization_category.min',
        'product_customization_category.max',
      ])
      .where('product_customization_category.id = :id', { id })
      .getOne();

    return productCustomizationCategory
      ? ProductCustomizationCategory.fromObject(productCustomizationCategory)
      : null;
  }

  async findAll(): Promise<ProductCustomizationCategory[]> {
    const productCustomizationCategories = await this.repository
      .createQueryBuilder('product_customization_category')
      .select([
        'product_customization_category.id',
        'product_customization_category.name',
        'product_customization_category.type',
        'product_customization_category.required',
        'product_customization_category.min',
        'product_customization_category.max',
      ])
      .getMany();

    return productCustomizationCategories.map(ProductCustomizationCategory.fromObject);
  }

  async update(id: number, data: Partial<ProductCustomizationCategoryPrimitives>): Promise<void> {
    await this.repository.update(id, data);
  }
}
