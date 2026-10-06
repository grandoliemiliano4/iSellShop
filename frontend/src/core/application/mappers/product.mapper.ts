import { Product } from "../../domain/entities/product.entity";

export class ProductMapper {
  static toDomain(apiProduct: any): Product {
    return {
      id: apiProduct.id,
      name: apiProduct.name,
      price: apiProduct.price,
      description: apiProduct.description,
      image: apiProduct.image,
      category: apiProduct.category,
      condition: apiProduct.condition || 'NUEVO',
      stock: typeof apiProduct.stock === 'number' ? apiProduct.stock : 1,
      capacity: apiProduct.capacity as '16' | '32' | '64' | '128' | '256' | '512' | '1024' | undefined,
      color: apiProduct.color,
    };
  }

  static toDomainList(apiProducts: any[]): Product[] {
    return apiProducts.map(ProductMapper.toDomain);
  }
}
