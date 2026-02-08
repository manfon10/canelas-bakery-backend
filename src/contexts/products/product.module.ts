import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateProductCategoryController } from './infraestructure/controllers/categories';
import {
  CreateProductController,
  GetAllProductsController,
} from './infraestructure/controllers/product';

import {
  TypeOrmProductCategoryRepositoryImpl,
  TypeOrmProductRepositoryImpl,
} from './infraestructure/persistence/typeorm/repositories';
import {
  ProductCategoryCustomizationSchema,
  ProductCategorySchema,
  ProductCustomizationCategorySchema,
  ProductCustomizationOptionSchema,
  ProductSchema,
} from './infraestructure/persistence/typeorm/schemas';

import { CreateProductCategoryUseCase } from './application/categories';
import { CreateProductUseCase, GetAllProductsUseCase } from './application/products';

@Module({
  controllers: [CreateProductCategoryController, CreateProductController, GetAllProductsController],
  imports: [
    TypeOrmModule.forFeature([
      ProductCategorySchema,
      ProductSchema,
      ProductCategoryCustomizationSchema,
      ProductCustomizationOptionSchema,
      ProductCustomizationCategorySchema,
    ]),
  ],
  providers: [
    CreateProductCategoryUseCase,
    CreateProductUseCase,
    GetAllProductsUseCase,
    {
      provide: 'ProductRepository',
      useClass: TypeOrmProductRepositoryImpl,
    },
    {
      provide: 'ProductCategoryRepository',
      useClass: TypeOrmProductCategoryRepositoryImpl,
    },
  ],
  exports: ['ProductRepository', 'ProductCategoryRepository'],
})
export class ProductModule {}
