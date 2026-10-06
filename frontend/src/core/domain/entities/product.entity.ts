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
}
