import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  Repository,
  UpdateEvent,
} from 'typeorm';

import { ProductSchema } from '../schemas';
import { createUniqueSlug } from '@/contexts/shared/utils/create-slug.util';

@EventSubscriber()
export class ProductSchemaSubscriber implements EntitySubscriberInterface<ProductSchema> {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return ProductSchema;
  }

  async beforeInsert(event: InsertEvent<ProductSchema>) {
    await this.generateUniqueSlug(event.entity, event.manager.getRepository(ProductSchema));

    await this.generateUniqueReferenceCode(
      event.entity,
      event.manager.getRepository(ProductSchema),
    );
  }

  async beforeUpdate(event: UpdateEvent<ProductSchema>) {
    if (event.entity) {
      await this.generateUniqueSlug(
        event.entity as ProductSchema,
        event.manager.getRepository(ProductSchema),
      );
    }
  }

  private async generateUniqueSlug(product: ProductSchema, repository: Repository<ProductSchema>) {
    if (!product.name) return;

    const checkDuplicate = async (slug: string): Promise<boolean> => {
      const existing = await repository.findOne({
        where: { slug },
      });

      return !!existing && existing.id !== product.id;
    };

    product.slug = await createUniqueSlug(product.name, checkDuplicate, product.slug || undefined);
  }

  private async generateUniqueReferenceCode(
    product: ProductSchema,
    repository: Repository<ProductSchema>,
  ) {
    if (product.code) return;

    let isCodeUnique = false;
    let attempts = 0;

    const maxAttempts = 10;

    while (!isCodeUnique && attempts < maxAttempts) {
      product.code = this.generateProductCode();

      const existing = await repository.findOne({
        where: { code: product.code },
      });

      if (!existing) {
        isCodeUnique = true;
      }

      attempts++;
    }

    if (!isCodeUnique) {
      product.code = `PRD-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    }
  }

  private generateProductCode(): string {
    const date = new Date();

    const year = date.getFullYear().toString().substring(2);

    const month = (date.getMonth() + 1).toString().padStart(2, '0');

    const day = date.getDate().toString().padStart(2, '0');

    const random = Math.random().toString(36).substring(2, 6).toUpperCase();

    return `PRD${year}${month}${day}${random}`;
  }
}
