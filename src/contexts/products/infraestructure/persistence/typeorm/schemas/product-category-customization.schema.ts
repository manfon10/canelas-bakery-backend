import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ProductCategorySchema } from './product-category.schema';
import { ProductCustomizationCategorySchema } from './product-customization-category.schema';

@Entity('product_category_customizations')
@Index(
  'IDX_product_category_customization_unique',
  ['product_category_id', 'product_customization_category_id'],
  { unique: true },
)
export class ProductCategoryCustomizationSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', name: 'order', default: 0 })
  order: number;

  @Column({ type: 'int', name: 'product_category_id' })
  product_category_id: number;

  @Column({ type: 'int', name: 'product_customization_category_id' })
  product_customization_category_id: number;

  @ManyToOne(
    () => ProductCategorySchema,
    (productCategorySchema) => productCategorySchema.customizations,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'product_category_id', referencedColumnName: 'id' })
  product_category: Awaited<ProductCategorySchema>;

  @ManyToOne(
    () => ProductCustomizationCategorySchema,
    (productCustomizationCategorySchema) => productCustomizationCategorySchema.product_categories,
    {
      eager: true,
    },
  )
  @JoinColumn({ name: 'product_customization_category_id' })
  customization_category: Awaited<ProductCustomizationCategorySchema>;
}
