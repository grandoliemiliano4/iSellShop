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
      usedDetail: apiProduct.usedDetail ? {
        id: apiProduct.usedDetail.id,
        productId: apiProduct.usedDetail.productId,
        imei: apiProduct.usedDetail.imei,
        bateria: apiProduct.usedDetail.bateria,
        microfono: apiProduct.usedDetail.microfono,
        pantalla: apiProduct.usedDetail.pantalla,
        camara_trasera: apiProduct.usedDetail.camara_trasera,
        camara_frontal: apiProduct.usedDetail.camara_frontal,
        parlante: apiProduct.usedDetail.parlante,
        face_id: apiProduct.usedDetail.face_id,
        bordes: apiProduct.usedDetail.bordes,
        descripcion: apiProduct.usedDetail.descripcion,
        garantia_hasta: apiProduct.usedDetail.garantia_hasta,
        fecha_ingreso: apiProduct.usedDetail.fecha_ingreso,
        fecha_egreso: apiProduct.usedDetail.fecha_egreso,
      } : undefined,
      createdAt: apiProduct.createdAt,
      updatedAt: apiProduct.updatedAt,
    };
  }

  static toDomainList(apiProducts: any[]): Product[] {
    return apiProducts.map(ProductMapper.toDomain);
  }
}
