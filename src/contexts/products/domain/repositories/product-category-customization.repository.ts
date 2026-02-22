import { ProductCategoryCustomization, ProductCategoryCustomizationPrimitives } from '../entities';

export abstract class ProductCategoryCustomizationRepository {
  abstract assignCustomizationToCategory(
    product_category_id: number,
    product_customization_category_id: number,
  ): Promise<void>;
  abstract create(
    data: ProductCategoryCustomizationPrimitives,
  ): Promise<ProductCategoryCustomization>;
  abstract delete(id: number): Promise<void>;
  abstract existsCustomizationRelation(
    product_category_id: number,
    product_customization_category_id: number,
  ): Promise<boolean>;
  abstract findById(id: number): Promise<ProductCategoryCustomization | null>;
  abstract findAll(): Promise<ProductCategoryCustomization[]>;
  abstract update(id: number, data: Partial<ProductCategoryCustomizationPrimitives>): Promise<void>;
}
