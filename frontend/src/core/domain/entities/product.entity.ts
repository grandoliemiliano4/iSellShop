export interface UsedProductDetail {
  id: number;
  productId: number;
  imei: string;
  bateria: number;
  microfono: boolean;
  pantalla: boolean;
  camara_trasera: boolean;
  camara_frontal: boolean;
  parlante: boolean;
  face_id: boolean;
  bordes: string;
  descripcion?: string;
  garantia_hasta?: string | Date;
  fecha_ingreso: string | Date;
  fecha_egreso?: string | Date;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  condition: string;
  stock: number;
  capacity?: '16' | '32' | '64' | '128' | '256' | '512' | '1024';
  color?: string;
  usedDetail?: UsedProductDetail;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
