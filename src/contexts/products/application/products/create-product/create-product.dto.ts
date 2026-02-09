export interface CreateProductDto {
  name: string;
  description: string;
  base_price: number;
  category_id: number;
  type: string;
}
