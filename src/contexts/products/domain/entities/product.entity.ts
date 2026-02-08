import { ProductCategory } from './product-category.entity';

export interface ProductPrimitives {
  name: string;
  description: string;
  base_price: number;
  category_id: number;
  is_active?: boolean;
}

export class Product {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly description: string,
    public readonly base_price: string,
    public readonly is_active: string,
    public readonly category: ProductCategory,
  ) {}

  static fromObject(object: { [key: string]: any }): Product {
    const { id, name, description, base_price, is_active, category } = object;

    return new Product(id, name, description, base_price, is_active, category);
  }
}
