export interface ProductCategoryCustomizationPrimitives {
  order: number;
  product_category_id: number;
  product_customization_category_id: number;
}

export class ProductCategoryCustomization {
  constructor(
    public readonly id: number,
    public readonly order: number,
  ) {}

  static fromObject(object: { [key: string]: any }): ProductCategoryCustomization {
    const { id, order } = object;

    return new ProductCategoryCustomization(id, order);
  }
}
