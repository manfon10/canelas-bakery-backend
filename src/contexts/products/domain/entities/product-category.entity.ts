export interface ProductCategoryPrimitives {
  name: string;
  is_active?: boolean;
}

export class ProductCategory {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly is_active: string,
  ) {}

  static fromObject(object: { [key: string]: any }): ProductCategory {
    const { id, name, is_active } = object;

    return new ProductCategory(id, name, is_active);
  }
}
