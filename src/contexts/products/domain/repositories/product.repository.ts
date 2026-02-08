import { Product, ProductPrimitives } from '../entities';

export abstract class ProductRepository {
  abstract create(data: ProductPrimitives): Promise<Product>;
  abstract findById(id: number): Promise<Product | null>;
  abstract findAll(): Promise<Product[]>;
  abstract update(id: number, data: Partial<ProductPrimitives>): Promise<void>;
}
