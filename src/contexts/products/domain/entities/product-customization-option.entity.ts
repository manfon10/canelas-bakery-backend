import { ProductCustomizationCategory } from './product-customization-category.entity';

export interface ProductCustomizationOptionPrimitives {
  name: string;
  extra_price: number;
  description: string;
  customization_category_id: number;
}

export class ProductCustomizationOption {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly extra_price: number,
    public readonly description: number,
    public readonly customization_category: ProductCustomizationCategory,
  ) {}

  static fromObject(object: { [key: string]: any }): ProductCustomizationOption {
    const { id, name, extra_price, description, customization_category } = object;

    return new ProductCustomizationOption(
      id,
      name,
      extra_price,
      description,
      customization_category,
    );
  }
}
