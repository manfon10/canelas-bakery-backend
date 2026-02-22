import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  AssignCustomizationToCategoryController,
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
} from './infraestructure/controllers/products';
import {
  CreateProductCustomizationCategoryController,
  DeleteProductCustomizationCategoryByIdController,
  GetAllProductCustomizationCategoriesController,
  UpdateProductCustomizationCategoryByIdController,
} from './infraestructure/controllers/customization-categories';
import {
  CreateProductCustomizationOptionController,
  DeleteProductCustomizationOptionController,
  GetAllProductCustomizationOptionsController,
  UpdateProductCustomizationOptionController,
} from './infraestructure/controllers/customization-options';

import {
  TypeOrmProductCategoryCustomizationRepositoryImpl,
  TypeOrmProductCategoryRepositoryImpl,
  TypeOrmProductCustomizationCategoryImpl,
  TypeOrmProductCustomizationOptionImpl,
  TypeOrmProductRepositoryImpl,
} from './infraestructure/persistence/typeorm/repositories';
import {
  ProductCategoryCustomizationSchema,
  ProductCategorySchema,
  ProductCustomizationCategorySchema,
  ProductCustomizationOptionSchema,
  ProductRatingSchema,
  ProductSchema,
} from './infraestructure/persistence/typeorm/schemas';
import { ProductSchemaSubscriber } from './infraestructure/persistence/typeorm/subscribers';

import {
  AssignCustomizationToCategoryUseCase,
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
import {
  CreateProductCustomizationCategoryUseCase,
  DeleteProductCustomizationCategoryByIdUseCase,
  GetAllProductCustomizationCategoriesUseCase,
  UpdateProductCustomizationCategoryByIdUseCase,
} from './application/customization-categories';
import {
  CreateProductCustomizationOptionUseCase,
  DeleteProductCustomizationOptionByIdUseCase,
  GetAllProductCustomizationOptionsUseCase,
  UpdateProductCustomizationOptionByIdUseCase,
} from './application/customization-options';

@Module({
  controllers: [
    AssignCustomizationToCategoryController,
    CreateProductCategoryController,
    DeleteProductCategoryController,
    GetAllProductCategoriesController,
    GetProductCategoryByIdController,
    UpdateProductCategoryByIdController,

    GetAllProductCustomizationCategoriesController,
    CreateProductCustomizationCategoryController,
    UpdateProductCustomizationCategoryByIdController,
    DeleteProductCustomizationCategoryByIdController,

    CreateProductCustomizationOptionController,
    GetAllProductCustomizationOptionsController,
    UpdateProductCustomizationOptionController,
    DeleteProductCustomizationOptionController,

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
      ProductRatingSchema,
    ]),
  ],
  providers: [
    AssignCustomizationToCategoryUseCase,
    CreateProductCategoryUseCase,
    DeleteProductCategoryByIdUseCase,
    GetAllProductCategoriesUseCase,
    GetProductCategoryByIdUseCase,
    UpdateProductCategoryByIdUseCase,

    GetAllProductCustomizationCategoriesUseCase,
    CreateProductCustomizationCategoryUseCase,
    UpdateProductCustomizationCategoryByIdUseCase,
    DeleteProductCustomizationCategoryByIdUseCase,

    CreateProductCustomizationOptionUseCase,
    GetAllProductCustomizationOptionsUseCase,
    UpdateProductCustomizationOptionByIdUseCase,
    DeleteProductCustomizationOptionByIdUseCase,

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
    {
      provide: 'ProductCustomizationCategoryRepository',
      useClass: TypeOrmProductCustomizationCategoryImpl,
    },
    {
      provide: 'ProductCustomizationOptionRepository',
      useClass: TypeOrmProductCustomizationOptionImpl,
    },
    {
      provide: 'ProductCategoryCustomizationRepository',
      useClass: TypeOrmProductCategoryCustomizationRepositoryImpl,
    },

    ProductSchemaSubscriber,
  ],
  exports: [
    'ProductRepository',
    'ProductCategoryRepository',
    'ProductCustomizationCategoryRepository',
    'ProductCustomizationOptionRepository',
  ],
})
export class ProductModule {}
