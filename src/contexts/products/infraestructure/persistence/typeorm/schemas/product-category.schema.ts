import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ProductCategoryCustomizationSchema } from './product-category-customization.schema';
import { ProductSchema } from './product.schema';

@Entity('product_categories')
@Index('IDX_CATEGORRIES_IS_ACTIVE', ['is_active'])
@Index('IDX_CATEGORIES_DELETED_AT', ['deleted_at'])
export class ProductCategorySchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, name: 'name' })
  name: string;

  @Column({ type: 'boolean', name: 'is_active', default: true })
  is_active: boolean;

  @OneToMany(
    () => ProductCategoryCustomizationSchema,
    (productCategoryCustomizationSchema) => productCategoryCustomizationSchema.product_category,
  )
  customizations: Awaited<ProductCategoryCustomizationSchema[]>;

  @OneToMany(() => ProductSchema, (product) => product.category)
  products: Awaited<ProductSchema[]>;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deleted_at?: Date;
}
