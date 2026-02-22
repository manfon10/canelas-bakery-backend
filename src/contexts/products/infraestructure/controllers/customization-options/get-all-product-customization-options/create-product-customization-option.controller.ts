import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

import { Auth } from '@/contexts/auth/infraestructure/decorators';
import { GetAllProductCustomizationOptionsUseCase } from '@/contexts/products/application/customization-options';
import { ProductCustomizationOption } from '@/contexts/products/domain/entities';

@Controller('/customization-options')
export class GetAllProductCustomizationOptionsController {
  constructor(
    private readonlygetAllProductCustomizationOptionUseCase: GetAllProductCustomizationOptionsUseCase,
  ) {}

  @Auth()
  @Get()
  @HttpCode(HttpStatus.OK)
  async run(): Promise<ProductCustomizationOption[]> {
    return await this.readonlygetAllProductCustomizationOptionUseCase.execute();
  }
}
