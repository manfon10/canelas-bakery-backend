import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { ProductCategoryCustomizationRepository } from '@/contexts/products/domain/repositories';
import {
  ProductCategoryCustomizationPrimitives,
  ProductCategoryCustomization,
} from '@/contexts/products/domain/entities';

import { ProductCategoryCustomizationSchema } from '../schemas';

export class TypeOrmProductCategoryCustomizationRepositoryImpl implements ProductCategoryCustomizationRepository {
  constructor(
    @InjectRepository(ProductCategoryCustomizationSchema)
    private readonly repository: Repository<ProductCategoryCustomizationSchema>,
  ) {}

  async assignCustomizationToCategory(
    product_category_id: number,
    product_customization_category_id: number,
  ): Promise<void> {
    await this.repository.create({ product_category_id, product_customization_category_id });
  }

  async create(
    data: ProductCategoryCustomizationPrimitives,
  ): Promise<ProductCategoryCustomization> {
    const productCategoryCustomizationSaved = await this.repository.save(data);

    const productCategoryCustomization = await this.findById(productCategoryCustomizationSaved.id);

    return productCategoryCustomization!;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete({ id });
  }

  async existsCustomizationRelation(
    product_category_id: number,
    product_customization_category_id: number,
  ): Promise<boolean> {
    const count = await this.repository.count({
      where: {
        product_category_id,
        product_customization_category_id,
      },
    });

    return count > 0;
  }

  async findById(id: number): Promise<ProductCategoryCustomization | null> {
    const productCategoryCustomization = await this.repository
      .createQueryBuilder('product_category_customization')
      .select(['product_category_customization.id', 'product_category_customization.order'])
      .where('product_category_customization.id = :id', { id })
      .getOne();

    return productCategoryCustomization
      ? ProductCategoryCustomization.fromObject(productCategoryCustomization)
      : null;
  }

  async findAll(): Promise<ProductCategoryCustomization[]> {
    const productCategories = await this.repository
      .createQueryBuilder('product_category_customization')
      .select(['product_category_customization.id', 'product_category_customization.order'])
      .getMany();

    return productCategories.map(ProductCategoryCustomization.fromObject);
  }

  async update(id: number, data: Partial<ProductCategoryCustomizationPrimitives>): Promise<void> {
    await this.findById(id);

    await this.repository.update(id, data);
  }
}
