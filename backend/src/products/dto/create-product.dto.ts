import { IsString, IsNumber, IsOptional, IsIn } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'El nombre del producto', example: 'iPhone 15 Pro' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Descripción detallada', example: 'El mejor iPhone creado por Apple.' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Precio del producto en dólares', example: 999.99 })
  @Type(() => Number)
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'URL o path de la imagen', example: '/uploads/iphone.jpg', required: false })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({ description: 'Marca o categoría del equipo', example: 'iPhone' })
  @IsString()
  category: string;

  @ApiProperty({ description: 'Condición del equipo', example: 'NUEVO' })
  @IsString()
  condition: string;

  @ApiProperty({ description: 'Stock disponible', example: 1, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  stock?: number;

  @ApiProperty({ description: 'Capacidad del equipo', example: '256', required: false })
  @IsOptional()
  @IsIn(['16', '32', '64', '128', '256', '512', '1024'])
  capacity?: string;

  @ApiProperty({ description: 'Color del equipo', example: 'Natural Titanium', required: false })
  @IsOptional()
  @IsString()
  color?: string;

  // --- UsedProductDetail Fields ---
  @IsOptional()
  @IsString()
  imei?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  bateria?: number;

  @IsOptional()
  microfono?: boolean;

  @IsOptional()
  pantalla?: boolean;

  @IsOptional()
  camara_trasera?: boolean;

  @IsOptional()
  camara_frontal?: boolean;

  @IsOptional()
  parlante?: boolean;

  @IsOptional()
  face_id?: boolean;

  @IsOptional()
  @IsString()
  bordes?: string;

  @IsOptional()
  @IsString()
  descripcion_usado?: string;

  @IsOptional()
  @IsString()
  garantia_hasta?: string;
}
