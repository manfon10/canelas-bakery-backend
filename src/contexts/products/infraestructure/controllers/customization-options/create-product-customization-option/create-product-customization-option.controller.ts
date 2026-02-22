import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { Auth } from '@/contexts/auth/infraestructure/decorators';
import { CreateProductCustomizationOptionUseCase } from '@/contexts/products/application/customization-options';

import { CreateProductCustomizationOptionDto } from './create-product-customization-option.dto';

@Controller('/customization-options')
export class CreateProductCustomizationOptionController {
  constructor(
    private readonly createProductCustomizationOptionUseCase: CreateProductCustomizationOptionUseCase,
  ) {}

  @Auth()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async run(@Body() data: CreateProductCustomizationOptionDto): Promise<void> {
    await this.createProductCustomizationOptionUseCase.execute(data);
  }
}
