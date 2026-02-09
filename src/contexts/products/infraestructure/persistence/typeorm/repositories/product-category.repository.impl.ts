import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { ProductCategoryRepository } from '@/contexts/products/domain/repositories';
import { ProductCategoryPrimitives, ProductCategory } from '@/contexts/products/domain/entities';

import { ProductCategorySchema } from '../schemas';

export class TypeOrmProductCategoryRepositoryImpl implements ProductCategoryRepository {
  constructor(
    @InjectRepository(ProductCategorySchema)
    private readonly repository: Repository<ProductCategorySchema>,
  ) {}

  async create(data: ProductCategoryPrimitives): Promise<ProductCategory> {
    const productCategorySaved = await this.repository.save(data);

    const productCategory = await this.findById(productCategorySaved.id);

    return productCategory!;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete({ id });
  }

  async findById(id: number): Promise<ProductCategory | null> {
    const productCategory = await this.repository
      .createQueryBuilder('product_category')
      .select(['product_category.id', 'product_category.name'])
      .where('product_category.id = :id', { id })
      .getOne();

    return productCategory ? ProductCategory.fromObject(productCategory) : null;
  }

  async findAll(): Promise<ProductCategory[]> {
    const productCategories = await this.repository
      .createQueryBuilder('product_category')
      .select(['product_category.id', 'product_category.name'])
      .getMany();

    return productCategories.map(ProductCategory.fromObject);
  }

  async update(id: number, data: Partial<ProductCategoryPrimitives>): Promise<void> {
    await this.findById(id);

    await this.repository.update(id, data);
  }
}
