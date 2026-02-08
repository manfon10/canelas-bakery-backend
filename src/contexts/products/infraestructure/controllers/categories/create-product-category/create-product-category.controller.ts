import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { Auth } from '@/contexts/auth/infraestructure/decorators';
import { CreateProductCategoryUseCase } from '@/contexts/products/application/categories';
import { ProductCategory } from '@/contexts/products/domain/entities';

import { CreateCategoryProductDto } from './create-product-category.dto';

@Controller('/categories')
export class CreateProductCategoryController {
  constructor(private readonly CreateProductCategory: CreateProductCategoryUseCase) {}

  @Auth()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async run(@Body() data: CreateCategoryProductDto): Promise<ProductCategory> {
    return await this.CreateProductCategory.execue(data);
  }
}
