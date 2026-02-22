import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { ProductPrimitives, Product } from '@/contexts/products/domain/entities';
import { ProductRepository } from '@/contexts/products/domain/repositories';

import { ProductSchema } from '../schemas';

export class TypeOrmProductRepositoryImpl implements ProductRepository {
  constructor(
    @InjectRepository(ProductSchema)
    private readonly repository: Repository<ProductSchema>,
  ) {}

  async create(data: ProductPrimitives): Promise<Product> {
    const productSaved = await this.repository.save(data);

    return Product.fromObject(productSaved);
  }

  async findById(id: number): Promise<Product | null> {
    const product = await this.repository
      .createQueryBuilder('product')
      .leftJoin('product.category', 'category')
      .leftJoin('category.customizations', 'customizations')
      .leftJoin('customizations.customization_category', 'customization_category')
      .leftJoin('customization_category.customization_options', 'customization_options')
      .select([
        'product.id',
        'product.name',
        'product.description',
        'product.base_price',
        'product.is_active',
        'product.slug',
        'product.type',
        'product.code',

        'category.id',
        'category.name',

        'customizations.order',

        'customization_category.id',
        'customization_category.name',
        'customization_category.type',
        'customization_category.required',
        'customization_category.min',
        'customization_category.max',

        'customization_options.id',
        'customization_options.name',
        'customization_options.extra_price',
        'customization_options.description',
      ])
      .where('product.id = :id', { id })
      .getOne();

    return product ? Product.fromObject(product) : null;
  }

  async findBySlug(slug: string): Promise<Product | null> {
    const product = await this.repository
      .createQueryBuilder('product')
      .leftJoin('product.category', 'category')
      .leftJoin('category.customizations', 'customizations')
      .leftJoin('customizations.customization_category', 'customization_category')
      .leftJoin('customization_category.customization_options', 'customization_options')
      .select([
        'product.id',
        'product.name',
        'product.description',
        'product.base_price',
        'product.is_active',
        'product.slug',
        'product.type',
        'product.code',

        'category.id',
        'category.name',

        'customizations.order',

        'customization_category.id',
        'customization_category.name',
        'customization_category.type',
        'customization_category.required',
        'customization_category.min',
        'customization_category.max',

        'customization_options.id',
        'customization_options.name',
        'customization_options.extra_price',
        'customization_options.description',
      ])
      .where('product.slug = :slug', { slug })
      .getOne();

    return product ? Product.fromObject(product) : null;
  }

  async findAll(): Promise<Product[]> {
    const products = await this.repository
      .createQueryBuilder('product')
      .leftJoin('product.category', 'category')
      .leftJoin('category.customizations', 'customizations')
      .leftJoin('customizations.customization_category', 'customization_category')
      .leftJoin('customization_category.customization_options', 'customization_options')
      .select([
        'product.id',
        'product.name',
        'product.description',
        'product.base_price',
        'product.is_active',
        'product.slug',
        'product.type',
        'product.code',

        'category.id',
        'category.name',

        'customizations.order',

        'customization_category.id',
        'customization_category.name',
        'customization_category.type',
        'customization_category.required',
        'customization_category.min',
        'customization_category.max',

        'customization_options.id',
        'customization_options.name',
        'customization_options.extra_price',
        'customization_options.description',
      ])
      .orderBy('customizations.order', 'ASC')
      .addOrderBy('customization_options.id', 'ASC')
      .getMany();

    return products.map(Product.fromObject);
  }

  async update(id: number, data: Partial<ProductPrimitives>): Promise<void> {
    await this.repository.update(id, data);
  }
}
