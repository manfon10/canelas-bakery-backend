import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  CreateProductCategoryController,
  DeleteProductCategoryController,
  GetAllProductCategoriesController,
  GetProductCategoryByIdController,
  UpdateProductCategoryByIdController,
} from './infraestructure/controllers/categories';
import {
  CreateProductController,
  GetAllProductsController,
  GetProductBySlugController,
  UpdateProductByIdController,
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
import { ProductSchemaSubscriber } from './infraestructure/persistence/typeorm/subscribers';

import {
  CreateProductCategoryUseCase,
  DeleteProductCategoryByIdUseCase,
  GetAllProductCategoriesUseCase,
  GetProductCategoryByIdUseCase,
  UpdateProductCategoryByIdUseCase,
} from './application/categories';
import {
  CreateProductUseCase,
  GetAllProductsUseCase,
  GetProductBySlugUseCase,
  UpdateProductUseCase,
} from './application/products';

@Module({
  controllers: [
    CreateProductCategoryController,
    DeleteProductCategoryController,
    GetAllProductCategoriesController,
    GetProductCategoryByIdController,
    UpdateProductCategoryByIdController,

    CreateProductController,
    GetAllProductsController,
    GetProductBySlugController,
    UpdateProductByIdController,
  ],
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
    DeleteProductCategoryByIdUseCase,
    GetAllProductCategoriesUseCase,
    GetProductCategoryByIdUseCase,
    UpdateProductCategoryByIdUseCase,

    CreateProductUseCase,
    GetAllProductsUseCase,
    GetProductBySlugUseCase,
    UpdateProductUseCase,

    {
      provide: 'ProductRepository',
      useClass: TypeOrmProductRepositoryImpl,
    },
    {
      provide: 'ProductCategoryRepository',
      useClass: TypeOrmProductCategoryRepositoryImpl,
    },

    ProductSchemaSubscriber,
  ],
  exports: ['ProductRepository', 'ProductCategoryRepository'],
})
export class ProductModule {}
