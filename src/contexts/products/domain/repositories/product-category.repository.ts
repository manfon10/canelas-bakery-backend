import { ProductCategory, ProductCategoryPrimitives } from '../entities';

export abstract class ProductCategoryRepository {
  abstract create(data: ProductCategoryPrimitives): Promise<ProductCategory>;
  abstract delete(id: number): Promise<void>;
  abstract findById(id: number): Promise<ProductCategory | null>;
  abstract findAll(): Promise<ProductCategory[]>;
  abstract update(id: number, data: Partial<ProductCategoryPrimitives>): Promise<void>;
}
