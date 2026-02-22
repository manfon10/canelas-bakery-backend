import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import { ProductCustomizationCategorySchema } from './product-customization-category.schema';

@Entity('product_customization_options')
export class ProductCustomizationOptionSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'name' })
  name: string;

  @Column({ type: 'text', name: 'description', nullable: true })
  description: string | null;

  @Column({ type: 'int', name: 'extra_price', default: 0 })
  extra_price: number;

  @Column({ type: 'int', name: 'customization_category_id' })
  customization_category_id: number;

  @ManyToOne(
    () => ProductCustomizationCategorySchema,
    (category) => category.customization_options,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'customization_category_id' })
  customization_category: Awaited<ProductCustomizationCategorySchema>;
}
