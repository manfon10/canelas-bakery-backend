import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ProductCategorySchema } from './product-category.schema';

@Entity('products')
@Index('IDX_PRODUCTS_IS_ACTIVE', ['is_active'])
@Index('IDX_PRODUCTS_CATEGORY', ['category_id'])
@Index('IDX_PRODUCTS_SLUG', ['slug'])
@Index('IDX_PRODUCTS_CODE', ['code'])
@Index('IDX_PRODUCTS_DELETED_AT', ['deleted_at'])
export class ProductSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, name: 'name' })
  name: string;

  @Column({ type: 'varchar', length: 100, name: 'description' })
  description: string;

  @Column({ type: 'int', name: 'base_price' })
  base_price: number;

  @Column({ type: 'varchar', name: 'slug', length: 100 })
  slug: string;

  @Column({ type: 'varchar', name: 'code', length: 100 })
  code: string;

  @Column({ type: 'boolean', name: 'is_active', default: true })
  is_active: boolean;

  @Column({ type: 'varchar', name: 'type' })
  type: string;

  @Column({ type: 'int', name: 'category_id' })
  category_id: number;

  @ManyToOne(() => ProductCategorySchema)
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category!: Awaited<ProductCategorySchema>;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deleted_at?: Date;
}
