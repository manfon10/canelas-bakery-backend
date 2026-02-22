import { ProductCustomizationCategory, ProductCustomizationCategoryPrimitives } from '../entities';

export abstract class ProductCustomizationCategoryRepository {
  abstract create(
    data: ProductCustomizationCategoryPrimitives,
  ): Promise<ProductCustomizationCategory>;
  abstract delete(id: number): Promise<void>;
  abstract findById(id: number): Promise<ProductCustomizationCategory | null>;
  abstract findAll(): Promise<ProductCustomizationCategory[]>;
  abstract update(id: number, data: Partial<ProductCustomizationCategoryPrimitives>): Promise<void>;
}
