interface CustomizationOptions {
  name: string;
  extra_price: number;
  description: string;
}

export interface CreateProductCustomizationOptionDto {
  options: CustomizationOptions[];
  customization_category_id: number;
}
