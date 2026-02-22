import { ProductCustomizationOption, ProductCustomizationOptionPrimitives } from '../entities';

export abstract class ProductCustomizationOptionRepository {
  abstract bulkCreate(data: ProductCustomizationOptionPrimitives[]): Promise<void>;
  abstract delete(id: number): Promise<void>;
  abstract findById(id: number): Promise<ProductCustomizationOption | null>;
  abstract findAll(): Promise<ProductCustomizationOption[]>;
  abstract update(id: number, data: Partial<ProductCustomizationOptionPrimitives>): Promise<void>;
}
