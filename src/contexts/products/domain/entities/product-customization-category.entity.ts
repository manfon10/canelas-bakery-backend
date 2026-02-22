export interface ProductCustomizationCategoryPrimitives {
  name: string;
  type: string;
  min: number;
  max: number;
  required: boolean;
}

export class ProductCustomizationCategory {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly type: string,
    public readonly min: number,
    public readonly max: number,
    public readonly required: string,
  ) {}

  static fromObject(object: { [key: string]: any }): ProductCustomizationCategory {
    const { id, name, type, min, max, required } = object;

    return new ProductCustomizationCategory(id, name, type, min, max, required);
  }
}
