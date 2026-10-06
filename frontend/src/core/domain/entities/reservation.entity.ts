import { Product } from './product.entity';
import { Client } from './client.entity';

export interface Reservation {
  id: number;
  productId: number;
  userId: number;
  clientId: number;
  status: string;
  observations?: string;
  tipo_interaccion: string;
  canal_venta?: string;
  date_retiro?: string;
  descuento?: number;
  comision?: number;
  last_modification?: string;
  reservedAt: string;
  expiresAt: string;
  
  // Relations (optional depending on API response)
  product?: Product;
  client?: Client;
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

export interface CreateReservationPayload {
  productId: number;
  userId: number;
  clientId: number;
  status?: string;
  observations?: string;
  tipo_interaccion?: string;
  canal_venta?: string;
  date_retiro?: string;
  descuento?: number;
  comision?: number;
  expiresAt?: string;
}
