export interface UpdateProductDto {
  name: string;
  description: string;
  base_price: number;
  category_id: number;
  type: string;
  is_active: boolean;
}
