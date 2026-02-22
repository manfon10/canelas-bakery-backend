import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { ProductCategoryCustomizationSchema } from './product-category-customization.schema';
import { ProductCustomizationOptionSchema } from './product-customization-option.schema';

@Entity('product_customization_categories')
export class ProductCustomizationCategorySchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'varchar', name: 'type', length: 100 })
  type: string;

  @Column({ type: 'boolean', name: 'required', default: false })
  required: boolean;

  @Column({ type: 'int', name: 'min', nullable: true })
  min: number | null;

  @Column({ type: 'int', name: 'max', nullable: true })
  max: number | null;

  @OneToMany(
    () => ProductCategoryCustomizationSchema,
    (productCategoryCustomizationSchema) =>
      productCategoryCustomizationSchema.customization_category,
  )
  product_categories: Awaited<ProductCategoryCustomizationSchema[]>;

  @OneToMany(
    () => ProductCustomizationOptionSchema,
    (productCustomizationOptionSchema) => productCustomizationOptionSchema.customization_category,
  )
  customization_options: Awaited<ProductCustomizationOptionSchema[]>;
}
